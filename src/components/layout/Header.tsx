'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import MobileMenu from '@/components/layout/MobileMenu';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/creer-mon-gateau', label: 'Créer mon gâteau' },
  { href: '/creations', label: 'Nos créations' },
  { href: '/#evenements', label: 'Événements' },
  { href: '/#savoir-faire', label: 'La maison' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, openCart, openSearch } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-luxe',
          scrolled || menuOpen
            ? 'border-b border-ivoire/[0.07] bg-noir/75 backdrop-blur-[10px]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1720px] items-center justify-between px-6 md:h-[76px] md:px-10">
          <Link href="/" aria-label="H-EKAM OAT — accueil" className="shrink-0">
            <Logo variant="header" size={26} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label link-underline !text-[9.5px] text-ivoire/70 transition-colors duration-500 hover:!text-ivoire"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6 md:gap-8">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Rechercher"
              className="hidden text-ivoire/70 transition-colors duration-500 hover:text-ivoire md:block"
            >
              <Icon name="search" size={17} />
            </button>
            <Link
              href="/compte"
              className="label link-underline hidden !text-[9.5px] text-ivoire/70 hover:!text-ivoire md:block"
            >
              Mon compte
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Ouvrir le panier (${items.length} article${items.length > 1 ? 's' : ''})`}
              className="relative text-ivoire/70 transition-colors duration-500 hover:text-ivoire"
            >
              <Icon name="bag" size={17} />
              {items.length > 0 && (
                <span className="absolute -right-2.5 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-bronze px-1 font-sans text-[8px] leading-none text-noir">
                  {items.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              className="flex flex-col items-end gap-[5px] p-1 lg:hidden"
            >
              <span className="block h-px w-5 bg-ivoire" />
              <span className="block h-px w-3.5 bg-ivoire" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
