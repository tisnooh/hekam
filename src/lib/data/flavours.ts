import type { FlavourOption } from '@/lib/types';

export type FlavourCategoryId = 'biscuit' | 'creme' | 'insert';

export interface FlavourCategory {
  id: FlavourCategoryId;
  label: string;
  options: FlavourOption[];
}

/** Catégories de saveurs : nom, texture, description, allergènes, supplément. */
export const FLAVOUR_CATEGORIES: FlavourCategory[] = [
  {
    id: 'biscuit',
    label: 'Biscuit',
    options: [
      {
        id: 'vanille',
        name: 'Vanille',
        swatch: '#EFE3C8',
        image: '/images/products/eclosion.jpg',
        description: 'Moelleux vanille de Madagascar',
        allergens: ['gluten', 'œufs', 'lait'],
      },
      {
        id: 'chocolat',
        name: 'Chocolat',
        swatch: '#3B2417',
        image: '/images/products/intense.jpg',
        description: 'Cacao grand cru 70 %, mie dense',
        allergens: ['gluten', 'œufs', 'lait', 'soja'],
      },
      {
        id: 'citron',
        name: 'Citron',
        swatch: '#E4C565',
        image: '/images/products/eclat.jpg',
        description: 'Zestes de citron de Menton',
        allergens: ['gluten', 'œufs'],
      },
      {
        id: 'amande',
        name: 'Amande',
        swatch: '#D9C4A3',
        description: 'Poudre d’amande torréfiée',
        allergens: ['gluten', 'œufs', 'fruits à coque'],
      },
    ],
  },
  {
    id: 'creme',
    label: 'Crème',
    options: [
      {
        id: 'vanille',
        name: 'Vanille',
        swatch: '#F1EAD9',
        image: '/images/editorial/savoir-faire.jpg',
        description: 'Crème légère vanille bourbon',
        allergens: ['lait'],
      },
      {
        id: 'chocolat',
        name: 'Chocolat',
        swatch: '#40281A',
        image: '/images/editorial/gallery-texture.jpg',
        description: 'Ganache montée grand cru',
        allergens: ['lait', 'soja'],
      },
      {
        id: 'praline',
        name: 'Praliné',
        swatch: '#B98A4E',
        image: '/images/editorial/gallery-texture.jpg',
        description: 'Noisette torréfiée et crème légère',
        allergens: ['lait', 'fruits à coque'],
        premium: true,
      },
      {
        id: 'mascarpone',
        name: 'Mascarpone',
        swatch: '#F4EEE2',
        description: 'Mascarpone fouetté, peu sucré',
        allergens: ['lait'],
      },
    ],
  },
  {
    id: 'insert',
    label: 'Insert',
    options: [
      {
        id: 'fruits-rouges',
        name: 'Fruits rouges',
        swatch: '#8E2438',
        description: 'Framboise, griotte et cassis',
        allergens: [],
      },
      {
        id: 'mangue-passion',
        name: 'Mangue passion',
        swatch: '#E29A3C',
        description: 'Mangue fraîche et passion acidulée',
        allergens: [],
      },
      {
        id: 'caramel',
        name: 'Caramel',
        swatch: '#B4693A',
        description: 'Caramel beurre salé coulant',
        allergens: ['lait'],
      },
      {
        id: 'citron',
        name: 'Citron',
        swatch: '#E8CE6E',
        description: 'Crémeux citron vif',
        allergens: [],
      },
    ],
  },
];

/** Accords recommandés — applicables en un geste depuis l’étape saveurs. */
export const RECOMMENDED_COMBOS: Array<{
  biscuit: string;
  creme: string;
  insert: string;
  label: string;
}> = [
  { biscuit: 'vanille', creme: 'praline', insert: 'caramel', label: 'Vanille + Praliné + Caramel' },
  { biscuit: 'chocolat', creme: 'praline', insert: 'fruits-rouges', label: 'Chocolat + Praliné + Fruits rouges' },
  { biscuit: 'vanille', creme: 'vanille', insert: 'fruits-rouges', label: 'Vanille + Fruits rouges' },
  { biscuit: 'citron', creme: 'mascarpone', insert: 'fruits-rouges', label: 'Citron + Fruits rouges' },
  { biscuit: 'amande', creme: 'mascarpone', insert: 'mangue-passion', label: 'Amande + Mangue passion' },
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
