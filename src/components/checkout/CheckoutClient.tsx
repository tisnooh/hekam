'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import AnimatedPrice from '@/components/ui/AnimatedPrice';
import Icon from '@/components/ui/Icon';
import { formatDateFr } from '@/lib/utils';
import { resolveZone } from '@/lib/data/delivery';

/**
 * Checkout — interface uniquement, ton rassurant et sobre.
 * Emplacement Stripe réservé (data-stripe-mount), non connecté.
 */
export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const needsAddress = useMemo(() => items.some((i) => i.configuration.delivery.mode === 'livraison'), [items]);
  const deliveryTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (item.configuration.delivery.mode !== 'livraison') return sum;
        const code = item.configuration.delivery.address?.postalCode || form.postalCode;
        const zone = code ? resolveZone(code) : null;
        return sum + (zone?.fee ?? 0);
      }, 0),
    [items, form.postalCode],
  );

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (confirmed) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-noir px-6">
        <div className="max-w-md text-center">
          <span className="mx-auto mb-8 block h-px w-12 bg-bronze" aria-hidden="true" />
          <h1 className="font-serif text-[clamp(34px,4vw,44px)] font-light leading-tight text-ivoire">
            Commande enregistrée
          </h1>
          <p className="mt-6 text-[13.5px] leading-[1.9] text-ivoire/55">
            Référence {confirmed}. Interface de démonstration : aucun paiement n’a été débité.
            L’atelier vous confirmera chaque détail par email à la connexion du service
            transactionnel.
          </p>
          <Link href="/" className="btn-ghost mt-11">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1240px] px-6 pb-36 pt-32 md:px-10 md:pt-44">
        <div className="mb-6 flex items-center gap-4">
          <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
          <p className="label-bronze">Commande</p>
        </div>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">Finaliser</h1>

        {items.length === 0 ? (
          <div className="mt-20 border-t border-b border-ivoire/[0.09] py-16 text-center">
            <p className="text-[14.5px] text-ivoire/55">Votre panier est vide.</p>
            <Link href="/creer-mon-gateau" className="btn-primary mt-9">
              Créer mon gâteau
            </Link>
          </div>
        ) : (
          <form
            className="mt-16 grid gap-20 lg:grid-cols-[1.25fr_1fr] lg:gap-24"
            onSubmit={(e) => {
              e.preventDefault();
              setConfirmed(`HO-${Math.floor(100000 + Math.random() * 900000)}`);
            }}
          >
            <div className="space-y-14">
              <Fieldset title="Vos coordonnées">
                <div className="grid gap-7 sm:grid-cols-2">
                  <Input label="Nom" value={form.lastName} onChange={set('lastName')} required autoComplete="family-name" />
                  <Input label="Prénom" value={form.firstName} onChange={set('firstName')} required autoComplete="given-name" />
                  <Input label="Email" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
                  <Input label="Téléphone" type="tel" value={form.phone} onChange={set('phone')} required autoComplete="tel" />
                </div>
              </Fieldset>

              {needsAddress && (
                <Fieldset title="Adresse de livraison">
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Input label="Adresse" value={form.address} onChange={set('address')} required autoComplete="street-address" />
                    <Input label="Ville" value={form.city} onChange={set('city')} required autoComplete="address-level2" />
                    <Input label="Code postal" value={form.postalCode} onChange={set('postalCode')} required inputMode="numeric" autoComplete="postal-code" />
                  </div>
                </Fieldset>
              )}

              <Fieldset title="Date & créneau">
                <ul>
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap items-baseline justify-between gap-3 border-t border-ivoire/[0.09] py-4 text-[12.5px] last:border-b"
                    >
                      <span className="text-ivoire/70">{item.title}</span>
                      <span className="text-ivoire/40">
                        {item.configuration.delivery.mode === 'livraison' ? 'Livraison' : item.configuration.delivery.mode === 'retrait' ? 'Retrait' : 'Mode à définir'} ·{' '}
                        {item.configuration.delivery.date ? formatDateFr(item.configuration.delivery.date) : 'date à confirmer'}{' '}
                        {item.configuration.delivery.slot ?? ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </Fieldset>

              <StripePlaceholder />
            </div>

            <aside className="h-fit lg:sticky lg:top-28">
              <p className="label mb-7 !text-[9.5px] text-ivoire/40">Récapitulatif</p>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-5 border-t border-ivoire/[0.09] py-4 text-[12.5px]">
                    <span className="text-ivoire/70">{item.title}</span>
                    <span className="shrink-0 text-ivoire/50">{item.unitPrice} €</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 border-t border-ivoire/[0.09] pt-6">
                <div className="flex justify-between py-1.5 text-[12.5px]">
                  <dt className="label !text-[9px]">Sous-total</dt>
                  <dd className="text-ivoire/70">{subtotal} €</dd>
                </div>
                <div className="flex justify-between py-1.5 text-[12.5px]">
                  <dt className="label !text-[9px]">Livraison</dt>
                  <dd className="text-ivoire/70">{deliveryTotal > 0 ? `${deliveryTotal} €` : 'Offerte / retrait'}</dd>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-ivoire/[0.09] pt-5">
                  <dt className="label !text-[9.5px] text-ivoire/60">Total</dt>
                  <dd>
                    <AnimatedPrice value={subtotal + deliveryTotal} className="font-serif text-[28px] font-light leading-none text-bronze-clair" />
                  </dd>
                </div>
              </dl>
              <button type="submit" className="btn-primary mt-9 w-full">
                Confirmer la commande
              </button>
              <p className="mt-5 text-[10.5px] leading-relaxed text-ivoire/30">
                Démonstration frontend : aucun paiement réel. Stripe sera connecté en phase 5.
              </p>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-7 flex items-center gap-4">
        <span className="block h-px w-7 bg-bronze/70" aria-hidden="true" />
        <h2 className="label !text-[9.5px] text-ivoire/70">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'numeric';
}) {
  return (
    <label className="block">
      <span className="label mb-3 block !text-[9px]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full border-b border-ivoire/20 bg-transparent pb-3 text-[14px] text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none"
      />
    </label>
  );
}

/** Emplacement futur du paiement Stripe (Phase 5). */
function StripePlaceholder() {
  return (
    <section aria-label="Paiement">
      <div className="mb-7 flex items-center gap-4">
        <span className="block h-px w-7 bg-bronze/70" aria-hidden="true" />
        <h2 className="label !text-[9.5px] text-ivoire/70">Paiement</h2>
      </div>
      <div
        data-stripe-mount="payment-element"
        className="flex items-start gap-5 border-l border-bronze/40 py-2 pl-6"
      >
        <Icon name="info" size={16} strokeWidth={0.9} className="mt-0.5 shrink-0 text-ivoire/30" />
        <p className="max-w-[46ch] text-[11.5px] leading-relaxed text-ivoire/40">
          Le module de paiement sécurisé (Stripe Payment Element) s’affichera ici.
          Architecture prévue : <code className="text-ivoire/60">/api/stripe/create-intent</code> — non
          connecté en démo.
        </p>
      </div>
    </section>
  );
}
