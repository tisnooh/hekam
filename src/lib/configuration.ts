import type { CakeConfiguration } from '@/lib/types';

/**
 * État initial obligatoire : aucun choix métier prérempli.
 * Le récapitulatif affiche « — » et le total « À déterminer »
 * tant que le client n'a rien sélectionné.
 */
export function createEmptyConfiguration(): CakeConfiguration {
  return {
    occasion: null,
    size: null,
    shape: null,
    flavours: { biscuit: null, creme: null, insert: null },
    decoration: { style: null, mainColor: null, secondaryColor: null, finish: null, options: [] },
    message: { text: '', age: '', color: 'bronze', topper: false },
    workshopNotes: '',
    inspirationName: null,
    delivery: { mode: null, date: null, slot: null, address: null },
  };
}

/** Compatibilité : ancien nom utilisé par le reste du site. */
export const createDefaultConfiguration = createEmptyConfiguration;

/** Libellé lisible d'une configuration (panier, récapitulatifs). */
export function configurationTitle(config: CakeConfiguration): string {
  if (!config.size) return 'Création sur mesure';
  const sizeLabel = config.size === 'p25' ? '25+ personnes' : `${config.size.replace('p', '').replace('-', '–')} personnes`;
  return `Création sur mesure · ${sizeLabel}`;
}

/**
 * Présets de configuration par création du catalogue :
 * « Personnaliser » depuis une fiche produit précharge une configuration
 * complète et cohérente avec la recette, modifiable à volonté.
 */
const PRODUCT_PRESETS: Record<string, Partial<CakeConfiguration>> = {
  eclosion: {
    size: 'p6-8',
    shape: 'rond',
    flavours: { biscuit: 'vanille', creme: 'vanille', insert: 'fruits-rouges' },
    decoration: { style: 'minimaliste', mainColor: 'ivoire', secondaryColor: 'poudre', finish: 'lisse', options: [] },
  },
  intense: {
    size: 'p6-8',
    shape: 'rond',
    flavours: { biscuit: 'chocolat', creme: 'praline', insert: 'caramel' },
    decoration: { style: 'minimaliste', mainColor: 'chocolat', secondaryColor: 'beige', finish: 'mate', options: ['dorure'] },
  },
  eclat: {
    size: 'p6-8',
    shape: 'rond',
    flavours: { biscuit: 'citron', creme: 'mascarpone', insert: 'citron' },
    decoration: { style: 'minimaliste', mainColor: 'blanc', secondaryColor: 'rouge', finish: 'lisse', options: ['fruits'] },
  },
  aube: {
    size: 'p10-12',
    shape: 'rond',
    flavours: { biscuit: 'vanille', creme: 'praline', insert: 'fruits-rouges' },
    decoration: { style: 'sculptural', mainColor: 'ivoire', secondaryColor: 'beige', finish: 'mate', options: [] },
  },
  voilage: {
    size: 'p25',
    shape: 'deux-etages',
    flavours: { biscuit: 'amande', creme: 'mascarpone', insert: 'mangue-passion' },
    decoration: { style: 'romantique', mainColor: 'ivoire', secondaryColor: 'poudre', finish: 'mate', options: ['ruban', 'fleurs'] },
  },
  nuage: {
    size: 'p4',
    shape: 'rond',
    flavours: { biscuit: 'vanille', creme: 'mascarpone', insert: 'fruits-rouges' },
    decoration: { style: 'minimaliste', mainColor: 'blanc', secondaryColor: 'poudre', finish: 'velours', options: ['perles'] },
  },
};

export function buildConfigurationFromProduct(slug: string): CakeConfiguration {
  const base = createEmptyConfiguration();
  const preset = PRODUCT_PRESETS[slug];
  if (!preset) return base;
  return {
    ...base,
    ...preset,
    decoration: { ...base.decoration, ...preset.decoration },
    flavours: { ...base.flavours, ...preset.flavours },
  };
}
