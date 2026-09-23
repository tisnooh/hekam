'use client';

import Image from 'next/image';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { OCCASIONS } from '@/lib/data/occasions';
import { cn } from '@/lib/utils';

/** Étape 1 — images minimalistes, légendes sous la photo. */
export default function StepOccasion() {
  const { config, update } = useConfigurator();

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
      {OCCASIONS.map((occasion) => {
        const selected = config.occasion === occasion.id;
        return (
          <button
            key={occasion.id}
            type="button"
            onClick={() => update({ occasion: occasion.id })}
            aria-pressed={selected}
            className="group block text-left"
          >
            <div className="overflow-hidden bg-noir-soft">
              <Image
                src={occasion.image}
                alt=""
                width={800}
                height={600}
                loading="lazy"
                className={cn(
                  'aspect-[4/3] w-full object-cover transition-all duration-[1200ms] ease-luxe',
                  selected
                    ? 'opacity-100'
                    : 'opacity-45 group-hover:opacity-75 group-hover:scale-[1.015]',
                )}
              />
            </div>
            <p
              className={cn(
                'label mt-4 !text-[9.5px] transition-colors duration-500',
                selected ? '!text-bronze-clair' : 'text-ivoire/60 group-hover:text-ivoire/90',
              )}
            >
              {occasion.label}
            </p>
            <span
              className={cn(
                'mt-2 block h-px origin-left transition-transform duration-700 ease-luxe',
                selected ? 'scale-x-100 bg-bronze' : 'scale-x-0 bg-bronze',
              )}
              aria-hidden="true"
            />
            <p className="mt-2.5 truncate text-[11.5px] text-ivoire/35">{occasion.hint}</p>
          </button>
        );
      })}
    </div>
  );
}
