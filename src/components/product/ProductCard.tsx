'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  tone?: 'light' | 'dark';
  /** Décalage vertical éditorial (desktop uniquement) */
  offset?: boolean;
  priority?: boolean;
  /** Numéro éditorial discret (01, 02…) */
  index?: number;
}

/**
 * Fiche création façon page de magazine : la photographie domine,
 * l'information se limite à l'essentiel, aucun cadre superflu.
 */
export default function ProductCard({ product, tone = 'light', offset = false, priority = false, index }: ProductCardProps) {
  const dark = tone === 'dark';
  return (
    <article className={cn('group', offset && 'xl:mt-24')}>
      <Link
        href={`/creations/${product.slug}`}
        className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-bronze"
        aria-label={`Découvrir ${product.name} — ${product.tagline}`}
      >
        <div className="relative overflow-hidden bg-noir-soft">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            width={900}
            height={1125}
            priority={priority}
            className={cn(
              'aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-luxe',
              'group-hover:scale-[1.02]',
              !product.available && 'opacity-60 saturate-[0.7]',
            )}
          />
          {!product.available && (
            <span className="label absolute left-0 top-6 bg-noir/80 py-2 pl-4 pr-5 text-ivoire/75 backdrop-blur-sm">
              {product.availableFrom}
            </span>
          )}
        </div>

        <div className="mt-7 flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              'font-serif text-[30px] font-light leading-none md:text-[34px]',
              dark ? 'text-ivoire' : 'text-brun',
            )}
          >
            {product.name}
            {typeof index === 'number' && (
              <span className={cn('ml-3 align-super font-sans text-[10px] tracking-[0.2em]', dark ? 'text-ivoire/30' : 'text-brun/35')}>
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
          </h3>
          <p className={cn('shrink-0 font-sans text-[12px] tracking-[0.08em]', dark ? 'text-bronze-clair' : 'text-bronze')}>
            {formatPrice(product.priceFrom)}
          </p>
        </div>

        <p className={cn('mt-3 text-[13px] leading-relaxed', dark ? 'text-ivoire/55' : 'text-brun/65')}>
          {product.tagline} · {product.persons}
        </p>

        <span
          className={cn(
            'label mt-5 inline-block max-w-0 overflow-hidden whitespace-nowrap transition-all duration-700 ease-luxe group-hover:max-w-[200px]',
            'max-lg:max-w-[200px] [@media(pointer:coarse)]:max-w-[200px]',
            'border-b border-bronze/50 pb-1',
            dark ? 'text-bronze-clair' : 'text-bronze',
          )}
          aria-hidden="true"
        >
          Personnaliser
        </span>
      </Link>
    </article>
  );
}
