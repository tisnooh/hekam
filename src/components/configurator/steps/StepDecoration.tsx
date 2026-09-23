'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { OptionRow, Swatch, TextOption, StepSubTitle } from '@/components/configurator/ConfiguratorOptions';
import { DECORATION_STYLES, DECORATION_OPTIONS, FINISHES, TEXTURES, COLOR_PALETTE } from '@/lib/data/decorations';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice } from '@/lib/utils';
import type { DecorationOptionId, FinishId, TextureId } from '@/lib/types';

/** Étape 5 — styles en lignes, teintes en pastilles, options en textes. */
export default function StepDecoration() {
  const { config, update } = useConfigurator();
  const deco = config.decoration;

  const patch = (p: Partial<typeof deco>) => update({ decoration: { ...deco, ...p } });

  const toggleOption = (id: DecorationOptionId) =>
    patch({
      options: deco.options.includes(id) ? deco.options.filter((o) => o !== id) : [...deco.options, id],
    });

  return (
    <div className="space-y-14">
      <div>
        <StepSubTitle>Style</StepSubTitle>
        <div className="max-w-2xl">
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
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <StepSubTitle>Couleur principale</StepSubTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-5">
            {COLOR_PALETTE.map((c) => (
              <Swatch key={c.id} hex={c.hex} label={c.label} selected={deco.mainColor === c.id} onClick={() => patch({ mainColor: c.id })} />
            ))}
          </div>
        </div>
        <div>
          <StepSubTitle>Couleur secondaire</StepSubTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-5">
            {COLOR_PALETTE.map((c) => (
              <Swatch key={c.id} hex={c.hex} label={c.label} selected={deco.secondaryColor === c.id} onClick={() => patch({ secondaryColor: c.id })} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <StepSubTitle>Texture</StepSubTitle>
          <div className="grid grid-cols-3 gap-4">
            {TEXTURES.map((t) => (
              <TextOption
                key={t.id}
                selected={deco.texture === t.id}
                onClick={() => patch({ texture: t.id as TextureId })}
                priceLabel={PRICING.texture[t.id] ? `+ ${formatPrice(PRICING.texture[t.id])}` : undefined}
              >
                {t.label}
              </TextOption>
            ))}
          </div>
        </div>
        <div>
          <StepSubTitle>Finition</StepSubTitle>
          <div className="grid grid-cols-2 gap-4">
            {FINISHES.map((f) => (
              <TextOption
                key={f.id}
                selected={deco.finish === f.id}
                onClick={() => patch({ finish: f.id as FinishId })}
                priceLabel={PRICING.finish[f.id] ? `+ ${formatPrice(PRICING.finish[f.id])}` : undefined}
              >
                {f.label}
              </TextOption>
            ))}
          </div>
        </div>
      </div>

      <div>
        <StepSubTitle hint="Chaque option ajuste le total">Options</StepSubTitle>
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
      </div>
    </div>
  );
}
