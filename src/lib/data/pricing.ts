import type { DecorationOptionId, DecorationStyleId, ShapeId, SizeId } from '@/lib/types';

/**
 * Configuration centrale des prix (données de démonstration).
 * Tous les montants sont modifiables ici, sans toucher aux composants.
 * Phase 5 : ces valeurs proviendront de Supabase / back-office.
 */
export const PRICING = {
  /** Prix de base selon le format (biscuit + crème + insert inclus) */
  sizeBase: {
    p4: 45,
    'p6-8': 65,
    'p10-12': 85,
    'p15-20': 120,
    p25: 180,
  } satisfies Record<SizeId, number>,

  /** Supplément de forme */
  shape: {
    rond: 0,
    carre: 0,
    coeur: 5,
    chiffre: 10,
    'deux-etages': 35,
  } satisfies Record<ShapeId, number>,

  /** Supplément pour une saveur premium (ex. praliné) */
  premiumFlavour: 5,

  /** Supplément selon le style de décoration */
  decorationStyle: {
    minimaliste: 0,
    floral: 15,
    romantique: 12,
    sculptural: 18,
    enfant: 10,
    entreprise: 10,
  } satisfies Record<DecorationStyleId, number>,

  /** Finition velours (supplément) */
  finish: { mate: 0, velours: 6 },

  /** Texture de surface */
  texture: { lisse: 0, strie: 3, vague: 3 },

  /** Options de décoration */
  option: {
    fleurs: 6,
    fruits: 6,
    perles: 4,
    ruban: 5,
    dorure: 8,
    topper: 8,
  } satisfies Record<DecorationOptionId, number>,

  /** Message : couleur de lettrage incluse */
  message: 0,
} as const;
