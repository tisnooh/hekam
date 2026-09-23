'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { PRODUCTS, PRODUCT_FILTERS } from '@/lib/data/products';
import { cn } from '@/lib/utils';

const PERSONS_FILTERS = ['tous', 'p4', 'p6-8', 'p10-12', 'p15-20', 'p25'];
const PRICE_FILTERS = [
  { id: 'tous', label: 'Tous les prix', test: () => true },
  { id: 'moins-60', label: 'Moins de 60 €', test: (p: number) => p < 60 },
  { id: '60-100', label: '60 – 100 €', test: (p: number) => p >= 60 && p <= 100 },
  { id: 'plus-100', label: 'Plus de 100 €', test: (p: number) => p > 100 },
];
const FLAVOUR_FILTERS = ['tous', 'vanille', 'chocolat', 'citron', 'praliné', 'fruits'];

/** Galerie : images dominantes, filtres d'une seule ligne, respiration verticale. */
export default function CreationsClient() {
  const [tag, setTag] = useState('tous');
  const [persons, setPersons] = useState('tous');
  const [price, setPrice] = useState('tous');
  const [flavour, setFlavour] = useState('tous');

  const results = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (tag !== 'tous' && !p.tags.includes(tag)) return false;
      if (persons !== 'tous' && !p.persons.toLowerCase().includes(persons.replace('p', '').replace('25', '25+'))) return false;
      const priceFilter = PRICE_FILTERS.find((f) => f.id === price);
      if (priceFilter && !priceFilter.test(p.priceFrom)) return false;
      if (flavour !== 'tous') {
        const hay = `${p.tagline} ${p.composition.join(' ')}`.toLowerCase();
        if (!hay.includes(flavour)) return false;
      }
      return true;
    });
  }, [tag, persons, price, flavour]);

  return (
    <div>
      <div className="bg-noir">
        <div className="mx-auto max-w-[1720px] px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-44">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
              <p className="label-bronze">La collection</p>
            </div>
            <h1 className="font-serif text-[clamp(42px,6vw,72px)] font-light leading-[1.02] text-ivoire">
              Nos créations
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center justify-between gap-x-12 gap-y-6 border-t border-ivoire/[0.09] pt-7">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {PRODUCT_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setTag(f.id)}
                  aria-pressed={tag === f.id}
                  className={cn(
                    'label !text-[9.5px] transition-colors duration-500',
                    tag === f.id ? '!text-bronze-clair' : 'text-ivoire/45 hover:text-ivoire/85',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Select label="Personnes" value={persons} onChange={setPersons} options={PERSONS_FILTERS.map((p) => ({ id: p, label: p === 'tous' ? 'Toutes tailles' : p.replace('p', '').replace('25', '25+') + ' pers.' }))} />
              <Select label="Prix" value={price} onChange={setPrice} options={PRICE_FILTERS.map((f) => ({ id: f.id, label: f.label }))} />
              <Select label="Saveurs" value={flavour} onChange={setFlavour} options={FLAVOUR_FILTERS.map((f) => ({ id: f, label: f === 'tous' ? 'Toutes saveurs' : f }))} />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-ivoire text-brun">
        <div className="mx-auto max-w-[1720px] px-6 pb-36 pt-20 md:px-10 md:pt-28">
          {results.length === 0 ? (
            <p className="py-16 text-center text-[14.5px] text-brun/55">
              Aucune création ne correspond à ces filtres. Essayez d’élargir votre recherche.
            </p>
          ) : (
            <div className="grid gap-x-10 gap-y-24 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-14">
              {results.map((product, i) => (
                <Reveal key={product.slug} delay={(i % 3) * 0.1}>
                  <ProductCard product={product} tone="light" offset={i % 3 === 1} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ id: string; label: string }>;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="label !text-[9px] text-ivoire/30">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-ivoire/20 bg-transparent pb-1 font-sans text-[12px] tracking-[0.04em] text-ivoire/80 focus:border-bronze focus:outline-none [&>option]:text-noir"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
