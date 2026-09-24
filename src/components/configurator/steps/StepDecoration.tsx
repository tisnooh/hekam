'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { OptionRow, Swatch, TextOption, StepSubTitle } from '@/components/configurator/ConfiguratorOptions';
import { DECORATION_STYLES, DECORATION_OPTIONS, FINISHES, COLOR_PALETTE } from '@/lib/data/decorations';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice } from '@/lib/utils';
import type { DecorationOptionId, FinishId } from '@/lib/types';

/** Étape 5 — chaque choix modifie réellement la visualisation. */
export default function StepDecoration() {
  const { config, update } = useConfigurator();
  const deco = config.decoration;

  const patch = (p: Partial<typeof deco>) => update({ decoration: { ...deco, ...p } });

  const toggleOption = (id: DecorationOptionId) =>
    patch({
      options: deco.options.includes(id) ? deco.options.filter((o) => o !== id) : [...deco.options, id],
    });

  return (
    <div className="space-y-12">
      <fieldset>
        <StepSubTitle>Style</StepSubTitle>
        <div className="max-w-2xl" role="radiogroup" aria-label="Style de décoration">
          {DECORATION_STYLES.map((style) => (
            <OptionRow
              key={style.id}
              selected={deco.style === style.id}
              onClick={() => patch({ style: style.id })}
              title={style.label}
              meta={style.description}
              price={PRICING.decorationStyle[style.id] > 0 ? `+ ${formatPrice(PRICING.decorationStyle[style.id])}` : 'Inclus'}
            />
          ))}
        </div>
      </fieldset>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <fieldset>
          <StepSubTitle hint="Matière principale du gâteau">Couleur principale</StepSubTitle>
          <div className="flex flex-wrap gap-x-5 gap-y-5" role="radiogroup" aria-label="Couleur principale">
            {COLOR_PALETTE.map((c) => (
              <Swatch key={c.id} hex={c.hex} label={c.label} selected={deco.mainColor === c.id} onClick={() => patch({ mainColor: c.id })} />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <StepSubTitle hint="Rubans, fleurs, perles…">Couleur secondaire</StepSubTitle>
          <div className="flex flex-wrap gap-x-5 gap-y-5" role="radiogroup" aria-label="Couleur secondaire">
            {COLOR_PALETTE.map((c) => (
              <Swatch key={c.id} hex={c.hex} label={c.label} selected={deco.secondaryColor === c.id} onClick={() => patch({ secondaryColor: c.id })} />
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset>
        <StepSubTitle>Finition</StepSubTitle>
        <div className="grid max-w-lg grid-cols-3 gap-5" role="radiogroup" aria-label="Finition">
          {FINISHES.map((f) => (
            <TextOption
              key={f.id}
              selected={deco.finish === f.id}
              onClick={() => patch({ finish: f.id as FinishId })}
              priceLabel={PRICING.finish[f.id] ? `+ ${formatPrice(PRICING.finish[f.id])}` : undefined}
            >
              {f.label}
              <span className="mt-1 block text-[10px] normal-case tracking-normal text-ivoire/30">{f.hint}</span>
            </TextOption>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <StepSubTitle hint="Chaque option ajuste le total et la visualisation">Options</StepSubTitle>
        <div className="grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-6">
          {DECORATION_OPTIONS.map((opt) => (
            <TextOption
              key={opt.id}
              selected={deco.options.includes(opt.id)}
              onClick={() => toggleOption(opt.id)}
              priceLabel={`+ ${formatPrice(PRICING.option[opt.id])}`}
            >
              {opt.label}
            </TextOption>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
