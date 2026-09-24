'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { OptionRow, TextOption, StepSubTitle } from '@/components/configurator/ConfiguratorOptions';
import DeliveryCalendar from '@/components/configurator/DeliveryCalendar';
import { DELIVERY_SLOTS, PICKUP_POINT, resolveZone } from '@/lib/data/delivery';
import { formatPrice } from '@/lib/utils';
import type { DeliveryAddress } from '@/lib/types';

/** Étape 7 — mode, adresse éventuelle, date et créneau obligatoires. */
export default function StepLivraison() {
  const { config, update } = useConfigurator();
  const delivery = config.delivery;

  const patch = (p: Partial<typeof delivery>) => update({ delivery: { ...delivery, ...p } });

  const patchAddress = (p: Partial<DeliveryAddress>) =>
    patch({
      address: {
        ...(delivery.address ?? { address: '', complement: '', city: '', postalCode: '', phone: '' }),
        ...p,
      },
    });

  const postal = delivery.address?.postalCode ?? '';
  const zone = postal.trim().length >= 2 ? resolveZone(postal) : null;
  const zoneChecked = postal.trim().length >= 2;

  return (
    <div className="space-y-12">
      <fieldset>
        <StepSubTitle>Comment souhaitez-vous récupérer votre commande ?</StepSubTitle>
        <div className="max-w-2xl" role="radiogroup" aria-label="Mode de récupération">
          <OptionRow
            selected={delivery.mode === 'retrait'}
            onClick={() => patch({ mode: 'retrait' })}
            title="Retrait en boutique"
            meta={`${PICKUP_POINT.address} — ${PICKUP_POINT.hours}`}
            price="Offert"
          />
          <OptionRow
            selected={delivery.mode === 'livraison'}
            onClick={() => patch({ mode: 'livraison' })}
            title="Livraison"
            meta="Paris intramuros et petite couronne, créneaux de deux heures"
            price={`${formatPrice(15)} – ${formatPrice(25)}`}
          />
        </div>
      </fieldset>

      {delivery.mode === 'livraison' && (
        <fieldset className="max-w-2xl">
          <StepSubTitle hint="Obligatoire pour la livraison">Adresse de livraison</StepSubTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Adresse" value={delivery.address?.address ?? ''} onChange={(v) => patchAddress({ address: v })} placeholder="12 avenue des Lilas" />
            <Field label="Complément" value={delivery.address?.complement ?? ''} onChange={(v) => patchAddress({ complement: v })} placeholder="Bâtiment, étage, digicode…" />
            <Field label="Code postal" value={postal} onChange={(v) => patchAddress({ postalCode: v })} placeholder="75011" inputMode="numeric" />
            <Field label="Ville" value={delivery.address?.city ?? ''} onChange={(v) => patchAddress({ city: v })} placeholder="Paris" />
            <Field label="Téléphone" value={delivery.address?.phone ?? ''} onChange={(v) => patchAddress({ phone: v })} placeholder="06 12 34 56 78" inputMode="tel" />
          </div>
          <p className="mt-5 text-[12px] leading-relaxed" role="status" aria-live="polite">
            {zoneChecked &&
              (zone ? (
                <span className="text-bronze-clair">Zone desservie : {zone.label} — livraison {formatPrice(zone.fee)}.</span>
              ) : (
                <span className="text-ivoire/55">
                  Cette zone n’est pas encore desservie par la livraison. Choisissez le retrait en boutique.
                </span>
              ))}
          </p>
        </fieldset>
      )}

      {delivery.mode && (
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="max-w-md">
            <StepSubTitle hint="Jours fermés et dates complètes exclus">Date souhaitée</StepSubTitle>
            <DeliveryCalendar value={delivery.date} onChange={(date) => patch({ date })} />
          </div>
          <div>
            <StepSubTitle>Créneau</StepSubTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6" role="radiogroup" aria-label="Créneau">
              {DELIVERY_SLOTS.map((slot) => (
                <TextOption key={slot} selected={delivery.slot === slot} onClick={() => patch({ slot })}>
                  {slot}
                </TextOption>
              ))}
            </div>
            <p className="mt-9 max-w-[40ch] text-[11.5px] leading-relaxed text-ivoire/35">
              {delivery.mode === 'livraison'
                ? 'Présence requise au moment de la livraison : nos créations ne se déposent pas en boîte aux lettres.'
                : `Retrait : ${PICKUP_POINT.label}, ${PICKUP_POINT.address}.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: 'numeric' | 'tel';
}) {
  return (
    <label className="block">
      <span className="label mb-3 block !text-[9.5px]">{label}</span>
      <input
        type="text"
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-ivoire/20 bg-transparent pb-3 text-[14px] text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none"
      />
    </label>
  );
}
