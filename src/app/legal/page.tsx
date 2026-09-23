import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Légal',
  description: 'Mentions légales, conditions générales de vente, confidentialité et cookies.',
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    id: 'mentions',
    title: 'Mentions légales',
    body: 'H-EKAM OAT — boulangerie pâtisserie artisanale. Site de démonstration frontend : éditeur, hébergeur et numéro SIREN seront renseignés à la mise en production.',
  },
  {
    id: 'cgv',
    title: 'Conditions générales de vente',
    body: 'Les présentes conditions encadreront les commandes en ligne à l’ouverture du service de paiement : prix communiqués au configurateur, délais de fabrication, droit de rétractation non applicable aux denrées périssables personnalisées (art. L221-28 du Code de la consommation).',
  },
  {
    id: 'confidentialite',
    title: 'Confidentialité',
    body: 'Aucune donnée personnelle n’est collectée par cette démonstration : le panier et vos configurations restent dans votre navigateur. La politique de confidentialité complète sera publiée avec l’authentification et les paiements (phase 5).',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: 'Ce site n’utilise aucun cookie publicitaire ni traceur tiers. Seuls des stockage techniques locaux (panier de démonstration) sont employés, exemptés de consentement.',
  },
];

export default function LegalPage() {
  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[900px] space-y-12 px-5 pb-28 pt-32 md:px-10 md:pt-40">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
            <p className="label-bronze">Légal</p>
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">Mentions & conditions</h1>
        </div>
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="border-t border-ivoire/10 pt-8">
            <h2 className="label mb-5 text-bronze">{s.title}</h2>
            <p className="max-w-[62ch] text-[14px] leading-relaxed text-ivoire/65">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
