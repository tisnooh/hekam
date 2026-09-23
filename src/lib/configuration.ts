import type { CakeConfiguration } from '@/lib/types';

/** Configuration initiale du configurateur. */
export function createDefaultConfiguration(): CakeConfiguration {
  return {
    occasion: 'anniversaire',
    size: 'p6-8',
    shape: 'rond',
    flavours: { biscuit: 'vanille', creme: 'praline', insert: 'fruits-rouges' },
    decoration: {
      style: 'minimaliste',
      mainColor: 'ivoire',
      secondaryColor: 'creme',
      texture: 'lisse',
      finish: 'mate',
      options: [],
    },
    message: { text: '', color: 'bronze', topper: false },
    workshopNotes: '',
    inspirationName: null,
    logoName: null,
    delivery: { mode: 'retrait', date: null, slot: null, address: null },
  };
}

/** Libellé lisible d'une configuration (panier, récapitulatifs). */
export function configurationTitle(config: CakeConfiguration): string {
  const sizeLabel = config.size === 'p25' ? '25+ personnes' : config.size.replace('p', '').replace('-', '–') + ' personnes';
  return `Création sur mesure · ${sizeLabel}`;
}

/**
 * Présets de configuration par création du catalogue :
 * « AJOUTER AU PANIER » depuis une fiche produit ajoute une configuration
 * cohérente avec la recette, que le configurateur peut ensuite modifier.
 */
const PRODUCT_PRESETS: Record<string, Partial<CakeConfiguration>> = {
  eclosion: {
    flavours: { biscuit: 'vanille', creme: 'vanille', insert: 'fruits-rouges' },
  },
  intense: {
    flavours: { biscuit: 'chocolat', creme: 'praline', insert: 'caramel' },
  },
  eclat: {
    flavours: { biscuit: 'citron', creme: 'mascarpone', insert: 'citron' },
  },
  aube: {
    size: 'p10-12',
    flavours: { biscuit: 'vanille', creme: 'praline', insert: 'fruits-rouges' },
    decoration: {
      style: 'minimaliste',
      mainColor: 'ivoire',
      secondaryColor: 'creme',
      texture: 'vague',
      finish: 'mate',
      options: [],
    },
  },
  voilage: {
    size: 'p25',
    shape: 'deux-etages',
    flavours: { biscuit: 'amande', creme: 'mascarpone', insert: 'mangue-passion' },
    decoration: {
      style: 'romantique',
      mainColor: 'ivoire',
      secondaryColor: 'poudre',
      texture: 'strie',
      finish: 'mate',
      options: ['ruban'],
    },
  },
  nuage: {
    size: 'p4',
    flavours: { biscuit: 'vanille', creme: 'mascarpone', insert: 'fruits-rouges' },
    decoration: {
      style: 'minimaliste',
      mainColor: 'ivoire',
      secondaryColor: 'poudre',
      texture: 'lisse',
      finish: 'velours',
      options: ['perles'],
    },
  },
};

export function buildConfigurationFromProduct(slug: string): CakeConfiguration {
  const base = createDefaultConfiguration();
  const preset = PRODUCT_PRESETS[slug];
  if (!preset) return base;
  return {
    ...base,
    ...preset,
    decoration: { ...base.decoration, ...preset.decoration },
  };
}
