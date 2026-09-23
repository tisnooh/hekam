import type { Metadata } from 'next';
import ConfiguratorPageClient from '@/components/configurator/ConfiguratorPageClient';

export const metadata: Metadata = {
  title: 'Créer mon gâteau personnalisé',
  description:
    'Configurateur de gâteau sur mesure : occasion, format, forme, saveurs, décoration, message et livraison. Visualisation en direct, prix mis à jour à chaque choix.',
};

export default function ConfiguratorPage() {
  return <ConfiguratorPageClient />;
}
