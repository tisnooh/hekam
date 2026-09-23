import type { Metadata } from 'next';
import CreationsClient from '@/components/product/CreationsClient';

export const metadata: Metadata = {
  title: 'Nos créations',
  description:
    'Galerie des créations signatures H-EKAM OAT : gâteaux vanille, chocolat, citron, pièces de mariage et formats enfant. Filtrer par occasion, taille, prix et saveurs.',
};

export default function CreationsPage() {
  return <CreationsClient />;
}
