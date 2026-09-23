import type { OccasionId } from '@/lib/types';

export interface Occasion {
  id: OccasionId;
  label: string;
  image: string;
  hint: string;
}

export const OCCASIONS: Occasion[] = [
  { id: 'anniversaire', label: 'Anniversaire', image: '/images/products/aube.jpg', hint: 'Bougies, chiffres, messages' },
  { id: 'mariage', label: 'Mariage', image: '/images/events/mariage.jpg', hint: 'Pièces montées, étages' },
  { id: 'baby-shower', label: 'Baby shower', image: '/images/products/nuage.jpg', hint: 'Teintes poudrées, délicatesse' },
  { id: 'bapteme', label: 'Baptême', image: '/images/editorial/gallery-detail.jpg', hint: 'Symboles doux, perles' },
  { id: 'entreprise', label: 'Entreprise', image: '/images/products/intense.jpg', hint: 'Logo, couleurs de maison' },
  { id: 'autre', label: 'Autre', image: '/images/editorial/gallery-full-cake.jpg', hint: 'Une envie précise ? Dites-nous tout' },
];
