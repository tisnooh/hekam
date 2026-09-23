import type { FlavourCategory, FlavourCategoryId } from '@/lib/flavour-types';

export type { FlavourCategory, FlavourCategoryId };

/** Catégories de saveurs du configurateur. */
export const FLAVOUR_CATEGORIES: FlavourCategory[] = [
  {
    id: 'biscuit',
    label: 'Biscuit',
    options: [
      { id: 'vanille', name: 'Vanille', swatch: '#EFE3C8', allergens: ['gluten', 'œufs', 'lait'] },
      { id: 'chocolat', name: 'Chocolat', swatch: '#3B2417', allergens: ['gluten', 'œufs', 'lait', 'soja'] },
      { id: 'citron', name: 'Citron', swatch: '#E4C565', allergens: ['gluten', 'œufs'] },
      { id: 'amande', name: 'Amande', swatch: '#D9C4A3', allergens: ['gluten', 'œufs', 'fruits à coque'] },
    ],
  },
  {
    id: 'creme',
    label: 'Crème',
    options: [
      { id: 'vanille', name: 'Vanille', swatch: '#F1EAD9', allergens: ['lait'] },
      { id: 'chocolat', name: 'Chocolat', swatch: '#40281A', allergens: ['lait', 'soja'] },
      { id: 'praline', name: 'Praliné', swatch: '#B98A4E', allergens: ['lait', 'fruits à coque'], premium: true },
      { id: 'mascarpone', name: 'Mascarpone', swatch: '#F4EEE2', allergens: ['lait'] },
    ],
  },
  {
    id: 'insert',
    label: 'Insert',
    options: [
      { id: 'fruits-rouges', name: 'Fruits rouges', swatch: '#8E2438', allergens: [] },
      { id: 'mangue-passion', name: 'Mangue passion', swatch: '#E29A3C', allergens: [] },
      { id: 'caramel', name: 'Caramel', swatch: '#B4693A', allergens: ['lait'] },
      { id: 'citron', name: 'Citron', swatch: '#E8CE6E', allergens: [] },
    ],
  },
];

/** Combinaisons conseillées — badge discret « accord recommandé ». */
export const RECOMMENDED_COMBOS: Array<Partial<Record<FlavourCategoryId, string>>> = [
  { biscuit: 'vanille', creme: 'praline', insert: 'fruits-rouges' },
  { biscuit: 'chocolat', creme: 'chocolat', insert: 'caramel' },
  { biscuit: 'amande', creme: 'mascarpone', insert: 'fruits-rouges' },
  { biscuit: 'citron', creme: 'mascarpone', insert: 'citron' },
  { biscuit: 'vanille', creme: 'vanille', insert: 'mangue-passion' },
];

export function flavourName(category: FlavourCategoryId, id: string | null): string | null {
  if (!id) return null;
  const cat = FLAVOUR_CATEGORIES.find((c) => c.id === category);
  return cat?.options.find((o) => o.id === id)?.name ?? null;
}

export function isPremiumFlavour(category: FlavourCategoryId, id: string | null): boolean {
  if (!id) return false;
  const cat = FLAVOUR_CATEGORIES.find((c) => c.id === category);
  return Boolean(cat?.options.find((o) => o.id === id)?.premium);
}

export function isRecommendedCombo(flavours: Record<FlavourCategoryId, string | null>): boolean {
  return RECOMMENDED_COMBOS.some((combo) =>
    Object.entries(combo).every(([cat, id]) => flavours[cat as FlavourCategoryId] === id),
  );
}
