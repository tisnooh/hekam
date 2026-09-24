import type { DecorationOptionId, DecorationStyleId, FinishId } from '@/lib/types';

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
  { id: 'perles', label: 'Perles' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'ruban', label: 'Ruban' },
  { id: 'dorure', label: 'Dorure' },
  { id: 'topper', label: 'Topper' },
];

export const FINISHES: Array<{ id: FinishId; label: string; hint: string }> = [
  { id: 'lisse', label: 'Lisse', hint: 'Glaçage tiré, reflet doux' },
  { id: 'mate', label: 'Mate', hint: 'Crème satinée, sans brillance' },
  { id: 'velours', label: 'Velours', hint: 'Grain fin pulvérisé à froid' },
];

/** Palette maison — teintes sobres, doré réservé aux accents. */
export const COLOR_PALETTE: Array<{ id: string; label: string; hex: string }> = [
  { id: 'ivoire', label: 'Ivoire', hex: '#F4EFE8' },
  { id: 'blanc', label: 'Blanc', hex: '#FAF8F5' },
  { id: 'poudre', label: 'Rose poudré', hex: '#D8BFB4' },
  { id: 'beige', label: 'Beige', hex: '#D9C4A3' },
  { id: 'chocolat', label: 'Chocolat', hex: '#4A2E1E' },
  { id: 'rouge', label: 'Rouge', hex: '#7E2A33' },
  { id: 'nuit', label: 'Bleu nuit', hex: '#232B33' },
  { id: 'sauge', label: 'Vert sauge', hex: '#9AA694' },
];

export function paletteHex(id: string | null): string {
  return COLOR_PALETTE.find((c) => c.id === id)?.hex ?? '#F4EFE8';
}

export function paletteLabel(id: string | null): string {
  return COLOR_PALETTE.find((c) => c.id === id)?.label ?? '—';
}
