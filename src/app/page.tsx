import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Reassurance from '@/components/home/Reassurance';
import SignatureCreations from '@/components/home/SignatureCreations';
import ConfiguratorTeaser from '@/components/home/ConfiguratorTeaser';
import SavoirFaire from '@/components/home/SavoirFaire';
import EventsSection from '@/components/home/EventsSection';
import GallerySection from '@/components/home/GallerySection';

export const metadata: Metadata = {
  title: 'H-EKAM OAT — Boulangerie & Pâtisserie sur mesure à Paris',
  description:
    'Imaginez votre gâteau, personnalisez chaque détail et visualisez-le sous tous les angles. Créations artisanales sur mesure, retrait en boutique ou livraison.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />
      <SignatureCreations />
      <ConfiguratorTeaser />
      <SavoirFaire />
      <EventsSection />
      <GallerySection />
    </>
  );
}
