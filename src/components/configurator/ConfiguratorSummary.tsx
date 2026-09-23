'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import CakeViewer360 from '@/components/cake/CakeViewer360';
import AnimatedPrice from '@/components/ui/AnimatedPrice';
import { SIZES } from '@/lib/data/sizes';
import { OCCASIONS } from '@/lib/data/occasions';
import { DECORATION_STYLES } from '@/lib/data/decorations';
import { flavourName } from '@/lib/data/flavours';
import { formatDateFr } from '@/lib/utils';

const SHAPES: Record<string, string> = {
  rond: 'Rond',
  carre: 'Carré',
  coeur: 'Cœur',
  chiffre: 'Chiffre',
  'deux-etages': '2 étages',
};

/** Zone 3 — récapitulatif : filets fins, total vivant. */
export default function ConfiguratorSummary({ withVisual = true }: { withVisual?: boolean }) {
  const { config, price } = useConfigurator();

  const rows: Array<[string, string]> = [
    ['Occasion', OCCASIONS.find((o) => o.id === config.occasion)?.label ?? '—'],
    ['Personnes', SIZES.find((s) => s.id === config.size)?.label ?? '—'],
    ['Forme', SHAPES[config.shape]],
    [
      'Saveurs',
      [
        flavourName('biscuit', config.flavours.biscuit),
        flavourName('creme', config.flavours.creme),
        flavourName('insert', config.flavours.insert),
      ]
        .filter(Boolean)
        .join(' / ') || '—',
    ],
    ['Décoration', DECORATION_STYLES.find((s) => s.id === config.decoration.style)?.label ?? '—'],
    ['Message', config.message.text.trim() || '—'],
    [
      config.delivery.mode === 'livraison' ? 'Livraison' : 'Retrait',
      config.delivery.date
        ? `${formatDateFr(config.delivery.date)}${config.delivery.slot ? ` · ${config.delivery.slot}` : ''}`
        : 'Date à choisir',
    ],
  ];

  return (
    <div>
      <p className="label mb-6 !text-[9.5px] text-ivoire/40">Récapitulatif</p>

      {withVisual && (
        <div className="mb-7 h-[132px] w-full">
          <CakeViewer360 configuration={config} interactive={false} showHint={false} idPrefix="summary" />
        </div>
      )}

      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-5 border-t border-ivoire/[0.08] py-3.5 last:border-b">
            <dt className="label shrink-0 !text-[9px] text-ivoire/35">{label}</dt>
            <dd className="text-right text-[12.5px] leading-snug text-ivoire/75">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex items-baseline justify-between">
        <p className="label !text-[9.5px] text-ivoire/60">Total</p>
        <AnimatedPrice value={price.total} className="font-serif text-[30px] font-light leading-none text-bronze-clair" />
      </div>
      <p className="mt-3 text-[10.5px] leading-relaxed text-ivoire/30">
        Prix ajusté en direct selon vos choix. Livraison incluse le cas échéant.
      </p>
    </div>
  );
}
