import type { DecorationOptionId, DecorationStyleId, FinishId, TextureId } from '@/lib/types';

export interface DecorationStyle {
  id: DecorationStyleId;
  label: string;
  description: string;
}

export interface DecorationOption {
  id: DecorationOptionId;
  label: string;
}

export const DECORATION_STYLES: DecorationStyle[] = [
  { id: 'minimaliste', label: 'Minimaliste', description: 'Surfaces lisses, lignes pures, un seul accent.' },
  { id: 'floral', label: 'Floral', description: 'Fleurs fraîches ou sucre, disposées à la main.' },
  { id: 'romantique', label: 'Romantique', description: 'Volutes, perles et teintes poudrées.' },
  { id: 'sculptural', label: 'Sculptural', description: 'Volumes travaillés, textures architecturales.' },
  { id: 'enfant', label: 'Enfant', description: 'Douceur et délicatesse, sans jamais de cartoon.' },
  { id: 'entreprise', label: 'Entreprise', description: 'Logo, couleurs de maison, sobriété soignée.' },
];

export const DECORATION_OPTIONS: DecorationOption[] = [
  { id: 'fleurs', label: 'Fleurs' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'perles', label: 'Perles' },
  { id: 'ruban', label: 'Ruban' },
  { id: 'dorure', label: 'Dorure' },
  { id: 'topper', label: 'Topper' },
];

export const FINISHES: Array<{ id: FinishId; label: string }> = [
  { id: 'mate', label: 'Finition mate' },
  { id: 'velours', label: 'Finition velours' },
];

export const TEXTURES: Array<{ id: TextureId; label: string }> = [
  { id: 'lisse', label: 'Lisse' },
  { id: 'strie', label: 'Striée' },
  { id: 'vague', label: 'Vague' },
];

/** Palette maison — teintes sobres uniquement. */
export const COLOR_PALETTE: Array<{ id: string; label: string; hex: string }> = [
  { id: 'ivoire', label: 'Ivoire', hex: '#F4EFE8' },
  { id: 'creme', label: 'Crème', hex: '#EDE4DA' },
  { id: 'poudre', label: 'Rose poudré', hex: '#D8BFB4' },
  { id: 'sauge', label: 'Vert sauge', hex: '#9AA694' },
  { id: 'cacao', label: 'Cacao', hex: '#4A2E1E' },
  { id: 'noir', label: 'Noir doux', hex: '#1A1714' },
];

export function paletteHex(id: string): string {
  return COLOR_PALETTE.find((c) => c.id === id)?.hex ?? '#F4EFE8';
}
