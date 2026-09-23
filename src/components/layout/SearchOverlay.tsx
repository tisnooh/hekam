'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { PRODUCTS } from '@/lib/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeSearch();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    ).slice(0, 5);
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] bg-noir/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche"
          onClick={closeSearch}
        >
          <div className="mx-auto max-w-2xl px-6 pt-36" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="block h-px w-8 bg-bronze" aria-hidden="true" />
                <p className="label !text-[9.5px]">Rechercher une création</p>
              </div>
              <button type="button" onClick={closeSearch} aria-label="Fermer la recherche" className="p-2 text-ivoire">
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4 border-b border-ivoire/20 pb-4">
              <Icon name="search" size={18} className="text-bronze" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Vanille, chocolat, mariage…"
                className="w-full bg-transparent font-serif text-2xl font-light text-ivoire placeholder:text-ivoire/30 focus:outline-none"
                aria-label="Terme de recherche"
              />
            </div>

            <ul className="mt-8 space-y-1">
              {query && results.length === 0 && (
                <li className="py-6 text-sm text-gris">Aucune création ne correspond à « {query} ».</li>
              )}
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/creations/${p.slug}`}
                    onClick={closeSearch}
                    className="group flex items-baseline justify-between gap-6 border-b border-ivoire/8 py-4 transition-colors duration-400 hover:border-bronze/40"
                  >
                    <span className="font-serif text-xl text-ivoire group-hover:text-bronze-clair">{p.name}</span>
                    <span className="label shrink-0">
                      {p.tagline} · {formatPrice(p.priceFrom)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
