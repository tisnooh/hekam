'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createEmptyConfiguration, configurationTitle, buildConfigurationFromProduct } from '@/lib/configuration';
import { calculateCakePrice } from '@/lib/pricing';
import type { CakeConfiguration, PriceBreakdown, OccasionId, CartItem } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { OCCASIONS } from '@/lib/data/occasions';
import { resolveZone } from '@/lib/data/delivery';

export const CONFIGURATOR_STEPS = [
  { id: 'occasion', label: 'Occasion' },
  { id: 'personnes', label: 'Personnes' },
  { id: 'forme', label: 'Forme' },
  { id: 'saveurs', label: 'Saveurs' },
  { id: 'decoration', label: 'Décoration' },
  { id: 'message', label: 'Message' },
  { id: 'livraison', label: 'Livraison' },
] as const;

const STORAGE_KEY = 'h-ekam-oat:cake-config:v2';

/** Une étape n'est franchissable que si son choix obligatoire est fait. */
export function isStepComplete(step: number, config: CakeConfiguration): boolean {
  switch (step) {
    case 0:
      return config.occasion !== null;
    case 1:
      return config.size !== null;
    case 2:
      return config.shape !== null;
    case 3:
      return Boolean(config.flavours.biscuit && config.flavours.creme && config.flavours.insert);
    case 4:
      return Boolean(config.decoration.style && config.decoration.mainColor);
    case 5:
      return true; // le message est optionnel
    case 6: {
      if (!config.delivery.mode || !config.delivery.date || !config.delivery.slot) return false;
      if (config.delivery.mode === 'livraison') {
        const a = config.delivery.address;
        if (!a || !a.address.trim() || !a.city.trim() || !a.postalCode.trim() || !a.phone.trim()) return false;
        if (!resolveZone(a.postalCode)) return false;
      }
      return true;
    }
    default:
      return false;
  }
}

interface ConfiguratorContextValue {
  step: number;
  config: CakeConfiguration;
  price: PriceBreakdown;
  editingId: string | null;
  sourceSlug: string | null;
  restored: boolean;
  stepComplete: boolean;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  update: (patch: Partial<CakeConfiguration>) => void;
  addToCart: () => void;
  reset: () => void;
  isLastStep: boolean;
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

/** Priorité : édition panier > produit > occasion > brouillon local > vide. */
function resolveInitial(
  search: URLSearchParams,
  cartItems: CartItem[],
): { config: CakeConfiguration; editingId: string | null; sourceSlug: string | null; fromStorage: boolean } {
  const editId = search.get('edit');
  if (editId) {
    const item = cartItems.find((i) => i.id === editId);
    if (item) return { config: item.configuration, editingId: editId, sourceSlug: item.sourceSlug ?? null, fromStorage: false };
  }
  const productSlug = search.get('product');
  if (productSlug) return { config: buildConfigurationFromProduct(productSlug), editingId: null, sourceSlug: productSlug, fromStorage: false };
  const occasion = search.get('occasion') as OccasionId | null;
  if (occasion && OCCASIONS.some((o) => o.id === occasion)) {
    const config = createEmptyConfiguration();
    config.occasion = occasion;
    return { config, editingId: null, sourceSlug: null, fromStorage: false };
  }
  return { config: createEmptyConfiguration(), editingId: null, sourceSlug: null, fromStorage: true };
}

export function ConfiguratorProvider({ children }: { children: React.ReactNode }) {
  const search = useSearchParams();
  const { items, addItem, replaceItem } = useCart();
  const [init] = useState(() => resolveInitial(search, items));
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<CakeConfiguration>(init.config);
  const [restored, setRestored] = useState(!init.fromStorage);
  const hydrated = useRef(false);

  // Restauration du brouillon localStorage (côté client uniquement, sans hydration mismatch)
  useEffect(() => {
    if (!init.fromStorage || hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { config?: CakeConfiguration; step?: number };
        if (saved.config) {
          setConfig((prev) => ({ ...createEmptyConfiguration(), ...prev, ...saved.config }));
          setStep(Math.min(6, Math.max(0, saved.step ?? 0)));
        }
      }
    } catch {
      /* brouillon illisible : on repart proprement */
    }
    setRestored(true);
  }, [init.fromStorage]);

  // Sauvegarde du brouillon
  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ config, step }));
    } catch {
      /* stockage indisponible : non bloquant */
    }
  }, [config, step, restored]);

  const update = useCallback((patch: Partial<CakeConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const price = useMemo(() => calculateCakePrice(config), [config]);
  const stepComplete = useMemo(() => isStepComplete(step, config), [step, config]);

  const reset = useCallback(() => {
    setConfig(createEmptyConfiguration());
    setStep(0);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

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
      restored,
      stepComplete,
      goTo: (s) => setStep(Math.min(6, Math.max(0, s))),
      next: () => setStep((s) => (isStepComplete(s, config) ? Math.min(6, s + 1) : s)),
      back: () => setStep((s) => Math.max(0, s - 1)),
      update,
      addToCart,
      reset,
      isLastStep: step === 6,
    }),
    [step, config, price, init.editingId, init.sourceSlug, restored, stepComplete, update, addToCart, reset],
  );

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator(): ConfiguratorContextValue {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error('useConfigurator doit être utilisé sous ConfiguratorProvider');
  return ctx;
}
