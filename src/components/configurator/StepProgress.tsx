'use client';

import { CONFIGURATOR_STEPS, useConfigurator } from '@/context/ConfiguratorContext';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/** Zone 1 — progression discrète : numéros, labels, filets bronze. */
export default function StepProgress({ className }: { className?: string }) {
  const { step, goTo } = useConfigurator();

  return (
    <nav aria-label="Étapes du configurateur" className={className}>
      <ol>
        {CONFIGURATOR_STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'group flex w-full items-baseline gap-5 py-[13px] text-left transition-colors duration-500',
                  active ? 'text-ivoire' : 'text-ivoire/35 hover:text-ivoire/70',
                )}
              >
                <span
                  className={cn(
                    'w-5 shrink-0 font-sans text-[9px] tracking-[0.2em]',
                    active ? 'text-bronze' : done ? 'text-bronze/60' : 'text-ivoire/25',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className={cn('label !text-[9.5px]', active && '!text-ivoire')}>{s.label}</span>
                  <span
                    className={cn(
                      'mt-2.5 block h-px origin-left transition-transform duration-700 ease-luxe',
                      active ? 'scale-x-100 bg-bronze' : 'scale-x-0 bg-bronze',
                    )}
                    aria-hidden="true"
                  />
                </span>
                {done && <Icon name="check" size={11} strokeWidth={1.2} className="shrink-0 self-center text-bronze/60" />}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
