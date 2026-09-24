'use client';

import { useState } from 'react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import CakeViewer360 from '@/components/cake/CakeViewer360';
import AnimatedPrice from '@/components/ui/AnimatedPrice';
import { SIZES } from '@/lib/data/sizes';
import { OCCASIONS } from '@/lib/data/occasions';
import { DECORATION_STYLES, paletteLabel } from '@/lib/data/decorations';
import { flavourName } from '@/lib/data/flavours';
import { formatDateFr, formatPrice } from '@/lib/utils';

const SHAPES: Record<string, string> = {
  rond: 'Rond',
  carre: 'Carré',
  coeur: 'Cœur',
  chiffre: 'Chiffre',
  'deux-etages': '2 étages',
};

const FINISHES: Record<string, string> = { lisse: 'Lisse', mate: 'Mate', velours: 'Velours' };

/** Récapitulatif 100 % synchronisé : aucune valeur inventée, « — » si absent. */
export default function ConfiguratorSummary({ withVisual = true }: { withVisual?: boolean }) {
  const { config, price } = useConfigurator();
  const [detailOpen, setDetailOpen] = useState(false);

  const rows: Array<[string, string]> = [
    ['Occasion', config.occasion ? (OCCASIONS.find((o) => o.id === config.occasion)?.label ?? '—') : '—'],
    ['Personnes', config.size ? (SIZES.find((s) => s.id === config.size)?.label ?? '—') : '—'],
    ['Forme', config.shape ? SHAPES[config.shape] : '—'],
    ['Biscuit', flavourName('biscuit', config.flavours.biscuit) ?? '—'],
    ['Crème', flavourName('creme', config.flavours.creme) ?? '—'],
    ['Insert', flavourName('insert', config.flavours.insert) ?? '—'],
    ['Style', config.decoration.style ? (DECORATION_STYLES.find((s) => s.id === config.decoration.style)?.label ?? '—') : '—'],
    ['Couleur', config.decoration.mainColor ? paletteLabel(config.decoration.mainColor) : '—'],
    ['Finition', config.decoration.finish ? FINISHES[config.decoration.finish] : '—'],
    [
      'Options',
      config.decoration.options.length > 0
        ? config.decoration.options.map((o) => o.charAt(0).toUpperCase() + o.slice(1)).join(', ')
        : '—',
    ],
    ['Message', config.message.text.trim() || '—'],
    ['Date', config.delivery.date ? formatDateFr(config.delivery.date) : '—'],
    ['Créneau', config.delivery.slot ?? '—'],
    [
      'Mode',
      config.delivery.mode === 'livraison' ? 'Livraison' : config.delivery.mode === 'retrait' ? 'Retrait' : '—',
    ],
  ];

  return (
    <div>
      <p className="label mb-6 !text-[9.5px] text-ivoire/40">Aperçu de votre création</p>

      {withVisual && (
        <div className="mb-7 h-[132px] w-full">
          <CakeViewer360 configuration={config} interactive={false} showHint={false} idPrefix="summary" />
        </div>
      )}

      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-5 border-t border-ivoire/[0.08] py-[11px] last:border-b">
            <dt className="label shrink-0 !text-[9px] text-ivoire/35">{label}</dt>
            <dd className="text-right text-[12.5px] leading-snug text-ivoire/75">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7">
        <button
          type="button"
          onClick={() => setDetailOpen((o) => !o)}
          aria-expanded={detailOpen}
          className="label link-underline !text-[9px] text-ivoire/45 hover:text-bronze-clair"
        >
          {detailOpen ? 'Masquer le détail du prix' : 'Voir le détail du prix'}
        </button>
        {detailOpen && (
          <ul className="mt-4 space-y-2 border-l border-ivoire/10 pl-5">
            {price.ready && price.lines.length > 0 ? (
              price.lines.map((line) => (
                <li key={line.id} className="flex items-baseline justify-between gap-4 text-[11.5px]">
                  <span className="text-ivoire/55">{line.label}</span>
                  <span className="shrink-0 text-ivoire/75">{formatPrice(line.amount)}</span>
                </li>
              ))
            ) : (
              <li className="text-[11.5px] text-ivoire/40">Le détail apparaîtra après le choix du format.</li>
            )}
          </ul>
        )}
      </div>

      <div className="mt-7 flex items-baseline justify-between border-t border-ivoire/[0.12] pt-6">
        <p className="label !text-[9.5px] text-ivoire/60">Total</p>
        {price.ready ? (
          <AnimatedPrice value={price.total} className="font-serif text-[30px] font-light leading-none text-bronze-clair" />
        ) : (
          <span className="font-serif text-[19px] font-light italic text-ivoire/40">À déterminer</span>
        )}
      </div>
      <p className="mt-3 text-[10.5px] leading-relaxed text-ivoire/30">
        Prix ajusté en direct selon vos choix. Livraison incluse le cas échéant.
      </p>
    </div>
  );
}
