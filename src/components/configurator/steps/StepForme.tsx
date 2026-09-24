'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import type { ShapeId } from '@/lib/types';
import { PRICING } from '@/lib/data/pricing';
import { formatPrice, cn } from '@/lib/utils';

const SHAPES: Array<{ id: ShapeId; label: string; glyph: React.ReactNode }> = [
  { id: 'rond', label: 'Rond', glyph: <circle cx="20" cy="20" r="13" /> },
  { id: 'carre', label: 'Carré', glyph: <rect x="8" y="8" width="24" height="24" rx="2" /> },
  { id: 'coeur', label: 'Cœur', glyph: <path d="M20 31c-8-6-13-10-13-16 0-4 3-7 7-7 3 0 5 1.5 6 4 1-2.5 3-4 6-4 4 0 7 3 7 7 0 6-5 10-13 16z" /> },
  { id: 'chiffre', label: 'Chiffre', glyph: <path d="M15 10h10l-6 9c5 0 8 3 8 7s-3 7-8 7-8-3-8-7" /> },
  {
    id: 'deux-etages',
    label: '2 étages',
    glyph: (
      <>
        <rect x="8" y="22" width="24" height="11" />
        <rect x="13" y="10" width="14" height="12" />
      </>
    ),
  },
];

/** Étape 3 — la forme modifie immédiatement la visualisation. */
export default function StepForme() {
  const { config, update } = useConfigurator();

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-9 sm:grid-cols-5 sm:gap-x-8" role="radiogroup" aria-label="Forme du gâteau">
        {SHAPES.map((shape) => {
          const selected = config.shape === shape.id;
          const surcharge = PRICING.shape[shape.id];
          return (
            <button
              key={shape.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => update({ shape: shape.id })}
              className="group flex flex-col items-center text-center"
            >
              <svg
                viewBox="0 0 40 40"
                className={cn(
                  'h-12 w-12 transition-all duration-500 ease-luxe',
                  selected ? 'text-bronze-clair' : 'text-ivoire/40 group-hover:text-ivoire/80',
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                aria-hidden="true"
              >
                {shape.glyph}
              </svg>
              <span
                className={cn(
                  'label mt-4 !text-[9.5px] transition-colors duration-500',
                  selected ? '!text-bronze-clair' : 'text-ivoire/55 group-hover:text-ivoire/85',
                )}
              >
                {shape.label}
              </span>
              <span
                className={cn(
                  'mt-2.5 block h-px w-8 origin-center transition-transform duration-500 ease-luxe',
                  selected ? 'scale-x-100 bg-bronze' : 'scale-x-0 bg-bronze',
                )}
                aria-hidden="true"
              />
              <span className="mt-2 text-[10px] tracking-[0.06em] text-ivoire/30">
                {surcharge > 0 ? `+ ${formatPrice(surcharge)}` : 'Inclus'}
              </span>
            </button>
          );
        })}
      </div>
      {config.shape === 'chiffre' && (
        <p className="mt-8 border-l border-bronze/40 pl-5 text-[12px] leading-relaxed text-ivoire/45">
          Gâteau chiffre : la prévisualisation 3D affiche un aperçu symbolique. Le chiffre exact
          (et sa orientation) est confirmé avec l’atelier selon votre message.
        </p>
      )}
    </div>
  );
}
