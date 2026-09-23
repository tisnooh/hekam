'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

const LINKS = [
  { href: '/creer-mon-gateau', label: 'Créer mon gâteau' },
  { href: '/creations', label: 'Nos créations' },
  { href: '/#evenements', label: 'Événements' },
  { href: '/#savoir-faire', label: 'La maison' },
  { href: '/compte', label: 'Mon compte' },
];

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] flex flex-col bg-noir"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Logo variant="header" size={24} />
        <button type="button" onClick={onClose} aria-label="Fermer le menu" className="p-2 text-ivoire/80">
          <Icon name="close" size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Navigation mobile">
        {LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.07 * i + 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="block border-b border-ivoire/[0.07] py-6 font-serif text-[30px] font-light leading-none text-ivoire transition-colors duration-500 hover:text-bronze-clair"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="px-6 pb-12">
        <p className="label mb-3.5 !text-[9px] text-ivoire/30">H-EKAM OAT — Boulangerie · Pâtisserie</p>
        <p className="text-[11.5px] leading-[1.9] text-ivoire/40">
          12 rue des Artisans, 75011 Paris
          <br />
          Du mardi au samedi, 10h – 19h
        </p>
      </div>
    </motion.div>
  );
}
