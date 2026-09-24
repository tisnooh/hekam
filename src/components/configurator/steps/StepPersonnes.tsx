'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { OptionRow } from '@/components/configurator/ConfiguratorOptions';
import { SIZES } from '@/lib/data/sizes';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice } from '@/lib/utils';

/** Étape 2 — personnes, diamètre, étages, prix de base. */
export default function StepPersonnes() {
  const { config, update } = useConfigurator();

  return (
    <div className="max-w-2xl" role="radiogroup" aria-label="Nombre de personnes">
      {SIZES.map((size) => (
        <OptionRow
          key={size.id}
          selected={config.size === size.id}
          onClick={() => update({ size: size.id })}
          title={size.label}
          meta={`${size.diameter} · ${size.tiers}`}
          price={`À partir de ${formatPrice(PRICING.sizeBase[size.id])}`}
        />
      ))}
    </div>
  );
}
