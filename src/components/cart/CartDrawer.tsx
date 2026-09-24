'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import AnimatedPrice from '@/components/ui/AnimatedPrice';
import CakeViewer360 from '@/components/cake/CakeViewer360';
import { useCart } from '@/context/CartContext';
import { formatPrice, formatDateFr } from '@/lib/utils';
import { flavourName } from '@/lib/data/flavours';
import { DECORATION_STYLES } from '@/lib/data/decorations';
import { SIZES } from '@/lib/data/sizes';
import { OCCASIONS } from '@/lib/data/occasions';

/** Drawer panier : lisible, photographique, sans surdesign. */
export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Fermer le panier"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-noir/70 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[85] flex h-full w-full max-w-[430px] flex-col border-l border-ivoire/[0.08] bg-noir-soft"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
          >
            <header className="flex items-center justify-between border-b border-ivoire/[0.08] px-7 py-6">
              <p className="label !text-[9.5px] text-ivoire/70">Panier ({items.length})</p>
              <button type="button" onClick={closeCart} aria-label="Fermer" className="p-1 text-ivoire/60 hover:text-ivoire">
                <Icon name="close" size={17} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-7 py-7">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-7 text-center">
                  <Icon name="bag" size={26} strokeWidth={0.9} className="text-ivoire/20" />
                  <p className="max-w-[24ch] text-[13.5px] leading-relaxed text-gris">
                    Votre panier est vide. Votre première création vous attend.
                  </p>
                  <Link href="/creer-mon-gateau" onClick={closeCart} className="btn-ghost !px-7 !py-3.5">
                    Créer mon gâteau
                  </Link>
                </div>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li key={item.id} className="border-b border-ivoire/[0.08] py-7 first:pt-0 last:border-b-0">
                      <div className="flex gap-6">
                        <div className="h-[104px] w-[84px] shrink-0 bg-noir">
                          <CakeViewer360
                            configuration={item.configuration}
                            interactive={false}
                            showHint={false}
                            idPrefix={`cart-${item.id}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <p className="font-serif text-[19px] font-light leading-tight text-ivoire">{item.title}</p>
                            <p className="shrink-0 font-sans text-[12px] tracking-[0.06em] text-bronze-clair">
                              {formatPrice(item.unitPrice)}
                            </p>
                          </div>
                          <dl className="mt-3.5 space-y-1.5">
                            <Row label="Occasion" value={OCCASIONS.find((o) => o.id === item.configuration.occasion)?.label ?? '—'} />
                            <Row label="Format" value={SIZES.find((s) => s.id === item.configuration.size)?.label ?? '—'} />
                            <Row
                              label="Saveurs"
                              value={
                                [
                                  flavourName('biscuit', item.configuration.flavours.biscuit),
                                  flavourName('creme', item.configuration.flavours.creme),
                                  flavourName('insert', item.configuration.flavours.insert),
                                ]
                                  .filter(Boolean)
                                  .join(' / ') || '—'
                              }
                            />
                            <Row
                              label="Décor"
                              value={DECORATION_STYLES.find((s) => s.id === item.configuration.decoration.style)?.label ?? '—'}
                            />
                            {item.configuration.message.text && <Row label="Message" value={item.configuration.message.text} />}
                            <Row
                              label={item.configuration.delivery.mode === 'livraison' ? 'Livraison' : item.configuration.delivery.mode === 'retrait' ? 'Retrait' : 'Mode'}
                              value={
                                item.configuration.delivery.date
                                  ? `${formatDateFr(item.configuration.delivery.date)}${item.configuration.delivery.slot ? `, ${item.configuration.delivery.slot}` : ''}`
                                  : 'Date à choisir'
                              }
                            />
                          </dl>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-7 pl-[108px]">
                        <Link
                          href={`/creer-mon-gateau?edit=${item.id}`}
                          onClick={closeCart}
                          className="label link-underline !text-[9px] text-ivoire/60 hover:text-bronze-clair"
                        >
                          Modifier
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="label link-underline !text-[9px] text-ivoire/30 hover:text-bronze-clair"
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-ivoire/[0.08] px-7 py-6">
                <div className="flex items-baseline justify-between">
                  <p className="label !text-[9.5px] text-ivoire/60">Total</p>
                  <AnimatedPrice value={subtotal} className="font-serif text-[26px] font-light leading-none text-bronze-clair" />
                </div>
                <p className="mt-3 text-[10.5px] leading-relaxed text-ivoire/30">
                  Livraison calculée selon la zone. Paiement sécurisé à l’étape suivante.
                </p>
                <Link href="/commande" onClick={closeCart} className="btn-primary mt-5 w-full">
                  Commander
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-[64px] shrink-0 font-sans text-[8.5px] uppercase tracking-[0.16em] leading-[1.7] text-ivoire/30">
        {label}
      </dt>
      <dd className="text-[12px] leading-[1.7] text-ivoire/65">{value}</dd>
    </div>
  );
}
