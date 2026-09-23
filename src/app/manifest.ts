import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'H-EKAM OAT — Boulangerie & Pâtisserie',
    short_name: 'H-EKAM OAT',
    description: 'Créez votre gâteau sur mesure : saveurs, décoration, visualisation et commande.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070707',
    theme_color: '#070707',
    icons: [
      { src: '/images/brand/favicon-96.png', sizes: '96x96', type: 'image/png' },
    ],
  };
}
