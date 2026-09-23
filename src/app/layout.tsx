import type { Metadata } from 'next';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/inter';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchOverlay from '@/components/layout/SearchOverlay';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'H-EKAM OAT — Gâteaux personnalisés et pâtisserie sur mesure',
    template: '%s — H-EKAM OAT',
  },
  description:
    'Imaginez votre gâteau, personnalisez chaque détail, visualisez-le sous tous les angles. Créations artisanales sur mesure, retrait ou livraison.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'H-EKAM OAT',
    title: 'H-EKAM OAT — Boulangerie & Pâtisserie sur mesure',
    description:
      'Pâtisserie sur mesure : composez votre création, visualisez-la, nous la réalisons pour vos plus beaux moments.',
    images: [{ url: '/images/editorial/hero-cake.jpg', width: 1600, height: 1000, alt: 'Création H-EKAM OAT' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <a
              href="#contenu"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivoire focus:px-4 focus:py-2 focus:text-noir"
            >
              Aller au contenu
            </a>
            <Header />
            <SearchOverlay />
            <main id="contenu">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
