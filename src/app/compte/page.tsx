import type { Metadata } from 'next';
import Link from 'next/link';
import Icon, { type IconName } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Espace client H-EKAM OAT : commandes, créations, favoris, adresses et informations.',
  robots: { index: false, follow: false },
};

const SECTIONS: Array<{ icon: IconName; title: string; text: string; action?: string }> = [
  { icon: 'bag', title: 'Mes commandes', text: 'Suivi, dates de retrait et factures.', action: 'Aucune commande pour le moment' },
  { icon: 'cake', title: 'Mes créations', text: 'Vos configurations enregistrées, prêtes à recommander.', action: 'RECOMMANDER CE GÂTEAU — disponible après une première commande' },
  { icon: 'flower', title: 'Mes favoris', text: 'Les créations que vous gardez sous les yeux.' },
  { icon: 'store', title: 'Mes adresses', text: 'Adresses de livraison et points de retrait préférés.' },
  { icon: 'user', title: 'Mes informations', text: 'Coordonnées, email, téléphone, préférences.' },
];

/**
 * Espace client — frontend & architecture uniquement.
 * Phase 5 : authentification Supabase (magic link), données réelles.
 */
export default function AccountPage() {
  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1200px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
        <div className="mb-6 flex items-center gap-4">
          <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
          <p className="label-bronze">Espace client</p>
        </div>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">Mon compte</h1>
        <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-ivoire/55">
          L’espace client ouvre avec la phase 5 (authentification Supabase). L’architecture des
          sections est en place : chaque bloc sera connecté aux données réelles sans redesign.
        </p>

        <div className="mt-14 grid gap-px bg-ivoire/10 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <section key={section.title} className="bg-noir p-8">
              <Icon name={section.icon} size={22} className="mb-6 text-bronze" />
              <h2 className="font-serif text-[24px] font-light text-ivoire">{section.title}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-ivoire/50">{section.text}</p>
              {section.action && <p className="label mt-6 block text-ivoire/30">{section.action}</p>}
            </section>
          ))}
          <section className="flex flex-col justify-between bg-noir p-8">
            <p className="text-[13px] leading-relaxed text-ivoire/50">
              Déjà client en boutique ? Votre compte sera créé automatiquement à votre première
              commande en ligne.
            </p>
            <Link href="/creer-mon-gateau" className="btn-ghost mt-8 self-start">
              Créer mon gâteau
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
