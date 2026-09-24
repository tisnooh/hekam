'use client';

import Image from 'next/image';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { StepSubTitle, TextOption } from '@/components/configurator/ConfiguratorOptions';
import { FLAVOUR_CATEGORIES, RECOMMENDED_COMBOS, isPremiumFlavour } from '@/lib/data/flavours';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice, cn } from '@/lib/utils';
import type { FlavourCategoryId } from '@/lib/types';

/** Étape 4 — trois sous-sections riches + accords recommandés applicables. */
export default function StepSaveurs() {
  const { config, update } = useConfigurator();

  const setFlavour = (cat: FlavourCategoryId, id: string) =>
    update({ flavours: { ...config.flavours, [cat]: id } });

  const applyCombo = (combo: { biscuit: string; creme: string; insert: string }) =>
    update({ flavours: { biscuit: combo.biscuit, creme: combo.creme, insert: combo.insert } });

  return (
    <div className="space-y-12">
      {FLAVOUR_CATEGORIES.map((cat) => (
        <fieldset key={cat.id}>
          <StepSubTitle hint="Une seule sélection">{cat.label}</StepSubTitle>
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={cat.label}>
            {cat.options.map((option) => {
              const selected = config.flavours[cat.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setFlavour(cat.id, option.id)}
                  className={cn(
                    'group flex items-center gap-4 border p-3 text-left transition-all duration-500 ease-luxe',
                    selected ? 'border-bronze bg-noir-lift' : 'border-ivoire/10 hover:border-ivoire/28',
                  )}
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden" aria-hidden="true">
                    {option.image ? (
                      <Image src={option.image} alt="" width={96} height={96} loading="lazy" className={cn('h-full w-full object-cover transition-opacity duration-500', selected ? 'opacity-95' : 'opacity-55 group-hover:opacity-80')} />
                    ) : (
                      <span
                        className={cn('block h-full w-full transition-opacity duration-500', selected ? 'opacity-100' : 'opacity-60 group-hover:opacity-85')}
                        style={{ background: `radial-gradient(circle at 35% 30%, ${option.swatch} 0%, ${option.swatch} 55%, rgba(0,0,0,0.55) 100%)` }}
                      />
                    )}
                    {selected && <span className="absolute inset-0 ring-1 ring-inset ring-bronze/70" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={cn('font-serif text-[19px] font-light leading-none', selected ? 'text-ivoire' : 'text-ivoire/80')}>
                        {option.name}
                      </span>
                      {isPremiumFlavour(cat.id, option.id) && (
                        <span className="shrink-0 font-sans text-[10px] tracking-[0.08em] text-bronze-clair">
                          + {formatPrice(PRICING.premiumFlavour)}
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 block truncate text-[11.5px] text-ivoire/45">{option.description}</span>
                    <span className="mt-1 block truncate text-[10px] uppercase tracking-[0.12em] text-ivoire/28">
                      {option.allergens.length > 0 ? option.allergens.join(', ') : 'sans allergène majeur'}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div>
        <StepSubTitle hint="Application en un geste">Accords recommandés</StepSubTitle>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          {RECOMMENDED_COMBOS.map((combo) => {
            const active =
              config.flavours.biscuit === combo.biscuit &&
              config.flavours.creme === combo.creme &&
              config.flavours.insert === combo.insert;
            return (
              <TextOption key={combo.label} selected={active} onClick={() => applyCombo(combo)}>
                {combo.label}
              </TextOption>
            );
          })}
        </div>
      </div>
    </div>
  );
}
