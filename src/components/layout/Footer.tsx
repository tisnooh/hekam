import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const COLUMNS = [
  {
    title: 'Boutique',
    links: [
      { href: '/creations', label: 'Créations' },
      { href: '/creer-mon-gateau', label: 'Créer mon gâteau' },
      { href: '/#evenements', label: 'Événements' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { href: '/informations#livraison', label: 'Livraison' },
      { href: '/informations#retrait', label: 'Retrait' },
      { href: '/informations#allergenes', label: 'Allergènes' },
      { href: '/informations#conservation', label: 'Conservation' },
      { href: '/informations#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'La maison',
    links: [
      { href: '/#savoir-faire', label: 'À propos' },
      { href: '/#savoir-faire', label: 'Savoir-faire' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/legal#mentions', label: 'Mentions légales' },
      { href: '/legal#cgv', label: 'CGV' },
      { href: '/legal#confidentialite', label: 'Confidentialité' },
      { href: '/legal#cookies', label: 'Cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivoire/[0.08] bg-noir">
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 md:grid-cols-[1fr_2.2fr]">
          <div>
            <Logo variant="full" className="w-[132px] opacity-90 md:w-[148px]" />
            <p className="mt-9 max-w-[26ch] text-[13px] leading-[1.9] text-gris">
              Boulangerie & pâtisserie sur mesure. Chaque création est façonnée à la
              main, à la commande.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={`Pied de page — ${col.title}`}>
                <p className="label mb-6 !text-[9.5px] text-bronze">{col.title}</p>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[12.5px] text-ivoire/60 transition-colors duration-500 hover:text-ivoire"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivoire/[0.08] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label !text-[9.5px] text-ivoire/35">© {new Date().getFullYear()} H-EKAM OAT — Paris</p>
          <p className="label !text-[9.5px] text-ivoire/35">Fait main, à la commande</p>
        </div>
      </div>
    </footer>
  );
}
