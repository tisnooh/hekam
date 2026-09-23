'use client';

import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { PRODUCTS } from '@/lib/data/products';
import Icon from '@/components/ui/Icon';

/** Trois créations signatures, composées comme des pages de magazine. */
export default function SignatureCreations() {
  const signatures = PRODUCTS.slice(0, 3);

  return (
    <section className="bg-ivoire text-brun">
      <div className="mx-auto max-w-[1720px] px-6 py-28 md:px-10 md:py-44">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
              <p className="label-bronze">La collection</p>
            </div>
            <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.02]">
              Nos créations signatures
            </h2>
          </div>
          <Link
            href="/creations"
            className="label link-underline flex items-center gap-3 pb-2 text-brun/60 hover:text-bronze"
          >
            Toute la collection
            <Icon name="arrowRight" size={15} />
          </Link>
        </Reveal>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-3 md:gap-10 xl:gap-16">
          {signatures.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.12}>
              <ProductCard product={product} tone="light" offset={i === 1} priority={i === 0} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
