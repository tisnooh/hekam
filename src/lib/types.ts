/** Types partagés du domaine (données locales en phase 1–4). */

export type OccasionId =
  | 'anniversaire'
  | 'mariage'
  | 'baby-shower'
  | 'bapteme'
  | 'entreprise'
  | 'autre';

export type SizeId = 'p4' | 'p6-8' | 'p10-12' | 'p15-20' | 'p25';

export type ShapeId = 'rond' | 'carre' | 'coeur' | 'chiffre' | 'deux-etages';

export type FlavourCategoryId = 'biscuit' | 'creme' | 'insert';

export type DecorationStyleId =
  | 'minimaliste'
  | 'floral'
  | 'romantique'
  | 'sculptural'
  | 'enfant'
  | 'entreprise';

export type DecorationOptionId = 'fleurs' | 'fruits' | 'perles' | 'ruban' | 'dorure' | 'topper';

export type FinishId = 'mate' | 'velours';
export type TextureId = 'lisse' | 'strie' | 'vague';

export interface FlavourOption {
  id: string;
  name: string;
  /** Couleur d'aperçu pour les pastilles du configurateur */
  swatch: string;
  allergens: string[];
  /** Supplément éventuel (ex. praliné) — montant défini dans pricing.ts */
  premium?: boolean;
}

export interface SizeOption {
  id: SizeId;
  label: string;
  diameter: string;
  tiers: string;
}

export interface DeliveryAddress {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface CakeMessage {
  /** Texte posé sur le gâteau (25 caractères max) */
  text: string;
  color: string;
  topper: boolean;
}

export interface CakeDecoration {
  style: DecorationStyleId;
  mainColor: string;
  secondaryColor: string;
  texture: TextureId;
  finish: FinishId;
  options: DecorationOptionId[];
}

export interface CakeDelivery {
  mode: 'retrait' | 'livraison';
  date: string | null;
  slot: string | null;
  address: DeliveryAddress | null;
}

export interface CakeConfiguration {
  occasion: OccasionId | null;
  size: SizeId;
  shape: ShapeId;
  flavours: Record<FlavourCategoryId, string | null>;
  decoration: CakeDecoration;
  message: CakeMessage;
  workshopNotes: string;
  inspirationName: string | null;
  logoName: string | null;
  delivery: CakeDelivery;
}

export interface PriceLine {
  id: string;
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  lines: PriceLine[];
  total: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  composition: string[];
  allergens: string[];
  persons: string;
  dimensions: string;
  priceFrom: number;
  image: string;
  gallery: string[];
  tags: string[];
  available: boolean;
  availableFrom: string;
  storage: string;
  detail: string;
}

export interface CartItem {
  id: string;
  title: string;
  configuration: CakeConfiguration;
  unitPrice: number;
  sourceSlug?: string;
}
