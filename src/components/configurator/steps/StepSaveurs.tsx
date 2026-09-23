'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { Swatch, StepSubTitle } from '@/components/configurator/ConfiguratorOptions';
import { FLAVOUR_CATEGORIES, RECOMMENDED_COMBOS, isPremiumFlavour } from '@/lib/data/flavours';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice } from '@/lib/utils';
import type { FlavourCategoryId } from '@/lib/types';

/** Étape 4 — trois rangées de pastilles ; allergènes en pied. */
export default function StepSaveurs() {
  const { config, update } = useConfigurator();

  const setFlavour = (cat: FlavourCategoryId, id: string) =>
    update({ flavours: { ...config.flavours, [cat]: id } });

  const isRecommended = (cat: FlavourCategoryId, optionId: string) =>
    RECOMMENDED_COMBOS.some(
      (combo) =>
        combo[cat] === optionId &&
        Object.entries(combo).every(([c, id]) => c === cat || config.flavours[c as FlavourCategoryId] === id),
    );

  const allergens = Array.from(
    new Set(
      FLAVOUR_CATEGORIES.flatMap((cat) => cat.options.find((o) => o.id === config.flavours[cat.id])?.allergens ?? []),
    ),
  );

  return (
    <div className="space-y-12">
      {FLAVOUR_CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <StepSubTitle hint="Une sélection par catégorie">{cat.label}</StepSubTitle>
          <div className="flex flex-wrap gap-x-7 gap-y-6">
            {cat.options.map((option) => (
              <Swatch
                key={option.id}
                hex={option.swatch}
                label={option.name}
                selected={config.flavours[cat.id] === option.id}
                onClick={() => setFlavour(cat.id, option.id)}
                sublabel={
                  isPremiumFlavour(cat.id, option.id)
                    ? `+ ${formatPrice(PRICING.premiumFlavour)}`
                    : isRecommended(cat.id, option.id)
                      ? 'accord recommandé'
                      : undefined
                }
              />
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-ivoire/[0.09] pt-6">
        <p className="label mb-2.5 !text-[9.5px]">Allergènes de votre composition</p>
        <p className="max-w-[52ch] text-[12.5px] leading-relaxed text-ivoire/45">
          {allergens.length > 0 ? allergens.join(', ') : 'Aucun allergène majeur dans cette composition.'}
        </p>
      </div>
    </div>
  );
}
