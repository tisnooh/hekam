'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createDefaultConfiguration, configurationTitle, buildConfigurationFromProduct } from '@/lib/configuration';
import { calculateCakePrice } from '@/lib/pricing';
import type { CakeConfiguration, PriceBreakdown, OccasionId, CartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { OCCASIONS } from '@/lib/data/occasions';

export const CONFIGURATOR_STEPS = [
  { id: 'occasion', label: 'Occasion' },
  { id: 'personnes', label: 'Personnes' },
  { id: 'forme', label: 'Forme' },
  { id: 'saveurs', label: 'Saveurs' },
  { id: 'decoration', label: 'Décoration' },
  { id: 'message', label: 'Message' },
  { id: 'livraison', label: 'Livraison' },
] as const;

interface ConfiguratorContextValue {
  step: number;
  config: CakeConfiguration;
  price: PriceBreakdown;
  editingId: string | null;
  sourceSlug: string | null;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  update: (patch: Partial<CakeConfiguration>) => void;
  addToCart: () => void;
  isLastStep: boolean;
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

function initialConfig(search: URLSearchParams, cartItems: CartItem[]) {
  const editId = search.get('edit');
  if (editId) {
    const item = cartItems.find((i) => i.id === editId);
    if (item) return { config: item.configuration, editingId: editId, sourceSlug: item.sourceSlug ?? null };
  }
  const config = createDefaultConfiguration();
  const occasion = search.get('occasion') as OccasionId | null;
  if (occasion && OCCASIONS.some((o) => o.id === occasion)) config.occasion = occasion;
  // « Personnaliser » depuis une fiche produit : précharge la recette de la création
  const productSlug = search.get('product');
  if (productSlug) {
    return { config: buildConfigurationFromProduct(productSlug), editingId: null, sourceSlug: productSlug };
  }
  return { config, editingId: null, sourceSlug: null };
}

export function ConfiguratorProvider({ children }: { children: React.ReactNode }) {
  const search = useSearchParams();
  const { items, addItem, replaceItem } = useCart();
  const [init] = useState(() => initialConfig(search, items));
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<CakeConfiguration>(init.config);

  const update = useCallback((patch: Partial<CakeConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const price = useMemo(() => calculateCakePrice(config), [config]);

  const addToCart = useCallback(() => {
    const item: CartItem = {
      id: init.editingId ?? `cake-${Date.now().toString(36)}`,
      title: configurationTitle(config),
      configuration: config,
      unitPrice: price.total,
      sourceSlug: init.sourceSlug ?? undefined,
    };
    if (init.editingId) replaceItem(item);
    else addItem(item);
  }, [config, price.total, init.editingId, init.sourceSlug, addItem, replaceItem]);

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      step,
      config,
      price,
      editingId: init.editingId,
      sourceSlug: init.sourceSlug,
      goTo: (s) => setStep(Math.min(6, Math.max(0, s))),
      next: () => setStep((s) => Math.min(6, s + 1)),
      back: () => setStep((s) => Math.max(0, s - 1)),
      update,
      addToCart,
      isLastStep: step === 6,
    }),
    [step, config, price, init.editingId, init.sourceSlug, update, addToCart],
  );

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator(): ConfiguratorContextValue {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error('useConfigurator doit être utilisé sous ConfiguratorProvider');
  return ctx;
}
