'use client';

import Image from 'next/image';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { OCCASIONS } from '@/lib/data/occasions';
import { cn } from '@/lib/utils';

/** Étape 1 — bordure fine, fond presque noir, état actif bronze. */
export default function StepOccasion() {
  const { config, update } = useConfigurator();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3" role="radiogroup" aria-label="Occasion">
      {OCCASIONS.map((occasion) => {
        const selected = config.occasion === occasion.id;
        return (
          <button
            key={occasion.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => update({ occasion: occasion.id })}
            className={cn(
              'group border bg-noir-soft/60 p-3 text-left transition-all duration-500 ease-luxe',
              selected ? 'border-bronze bg-noir-lift' : 'border-ivoire/12 hover:border-ivoire/30',
            )}
          >
            <div className="relative mb-3 overflow-hidden">
              <Image
                src={occasion.image}
                alt=""
                width={400}
                height={220}
                loading="lazy"
                className={cn(
                  'aspect-[16/9] w-full object-cover transition-all duration-700 ease-luxe',
                  selected ? 'opacity-90' : 'opacity-40 group-hover:opacity-65',
                )}
              />
              {selected && <span className="absolute inset-0 ring-1 ring-inset ring-bronze/60" aria-hidden="true" />}
            </div>
            <p className={cn('label !text-[9.5px]', selected ? '!text-bronze-clair' : 'text-ivoire/75')}>{occasion.label}</p>
            <p className="mt-1.5 truncate text-[11px] text-ivoire/35">{occasion.hint}</p>
          </button>
        );
      })}
    </div>
  );
}
