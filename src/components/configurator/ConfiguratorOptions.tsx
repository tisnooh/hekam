'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Primitives de contrôle du studio : lignes, swatches et textes soulignés.
 * États actifs = bronze discret ; aucune grosse card uniforme.
 */

/** Ligne éditoriale selectable (format, style, mode de livraison) */
export function OptionRow({
  selected,
  onClick,
  title,
  meta,
  price,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  meta?: string;
  price?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'group grid w-full grid-cols-[14px_1fr_auto] items-baseline gap-5 border-t border-ivoire/[0.09] py-5 text-left transition-colors duration-500 last:border-b',
        selected ? 'text-ivoire' : 'text-ivoire/55 hover:text-ivoire/85',
        className,
      )}
    >
      <span className="relative h-3 w-3 self-center" aria-hidden="true">
        <span
          className={cn(
            'absolute inset-0 rounded-full border transition-all duration-500 ease-luxe',
            selected ? 'border-bronze' : 'border-ivoire/25 group-hover:border-ivoire/50',
          )}
        />
        <span
          className={cn(
            'absolute inset-[3px] rounded-full bg-bronze transition-transform duration-500 ease-luxe',
            selected ? 'scale-100' : 'scale-0',
          )}
        />
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-[22px] font-light leading-none md:text-[24px]">{title}</span>
        {meta && <span className="mt-2 block text-[12px] leading-relaxed text-ivoire/45">{meta}</span>}
      </span>
      {price && (
        <span className={cn('shrink-0 font-sans text-[11px] tracking-[0.08em]', selected ? 'text-bronze-clair' : 'text-ivoire/40')}>
          {price}
        </span>
      )}
    </button>
  );
}

/** Pastille de couleur (teintes, saveurs) */
export function Swatch({
  hex,
  label,
  selected,
  onClick,
  sublabel,
}: {
  hex: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="group flex w-[64px] flex-col items-center gap-3 text-center"
    >
      <span
        className={cn(
          'block h-10 w-10 rounded-full transition-all duration-500 ease-luxe',
          selected
            ? 'ring-1 ring-bronze ring-offset-4 ring-offset-noir'
            : 'opacity-80 ring-1 ring-ivoire/15 group-hover:opacity-100 group-hover:ring-ivoire/40',
        )}
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />
      <span
        className={cn(
          'font-sans text-[9.5px] uppercase tracking-[0.14em] leading-tight transition-colors duration-500',
          selected ? 'text-bronze-clair' : 'text-ivoire/50 group-hover:text-ivoire/80',
        )}
      >
        {label}
      </span>
      {sublabel && <span className="-mt-2 text-[9px] uppercase tracking-[0.1em] text-bronze-clair/70">{sublabel}</span>}
    </button>
  );
}

/** Option texte soulignée (textures, finitions, options, créneaux) */
export function TextOption({
  selected,
  onClick,
  children,
  priceLabel,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  priceLabel?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn('group flex flex-col items-start gap-2 py-1 text-left', className)}
    >
      <span
        className={cn(
          'font-sans text-[10.5px] uppercase tracking-[0.18em] transition-colors duration-500',
          selected ? 'text-bronze-clair' : 'text-ivoire/50 group-hover:text-ivoire/85',
        )}
      >
        {children}
        {priceLabel && (
          <span className={cn('ml-2 tracking-[0.06em]', selected ? 'text-bronze-clair/70' : 'text-ivoire/30')}>{priceLabel}</span>
        )}
      </span>
      <span
        className={cn(
          'block h-px w-full origin-left transition-transform duration-500 ease-luxe',
          selected ? 'scale-x-100 bg-bronze' : 'scale-x-0 bg-bronze group-hover:scale-x-100 group-hover:bg-ivoire/25',
        )}
        aria-hidden="true"
      />
    </button>
  );
}

/** Titre de sous-section : label + filet */
export function StepSubTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <p className="label !text-[9.5px] !text-ivoire/70">{children}</p>
      {hint && <p className="text-[11px] text-ivoire/30">{hint}</p>}
    </div>
  );
}
