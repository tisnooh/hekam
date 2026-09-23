import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration',
  description: 'Back-office H-EKAM OAT — architecture réservée.',
  robots: { index: false, follow: false },
};

const MODULES = [
  'Tableau de bord',
  'Commandes',
  'Calendrier',
  'Produits',
  'Saveurs',
  'Décorations',
  'Clients',
  'Livraisons',
  'Paramètres',
];

/**
 * /admin — architecture minimale réservée (Phase 5).
 * Aucun développement métier maintenant : le shell et la route existent,
 * les modules seront branchés sur Supabase + rôles staff.
 */
export default function AdminPage() {
  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
        <div className="mb-6 flex items-center gap-4">
          <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
          <p className="label-bronze">Back-office</p>
        </div>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">Administration</h1>
        <p className="mt-5 max-w-[56ch] text-[14px] leading-relaxed text-ivoire/55">
          Structure réservée à l’équipe. Les modules ci-dessous seront activés à la connexion de la
          base de données et des rôles staff ; le frontend public n’en dépend pas.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Modules d'administration" className="border-t border-ivoire/10 lg:border-t-0">
            <ul>
              {MODULES.map((m, i) => (
                <li key={m} className="flex items-baseline gap-4 border-b border-ivoire/10 py-3.5">
                  <span className="label w-5 text-bronze/70">{String(i + 1).padStart(2, '0')}</span>
                  <span className="label text-ivoire/60">{m}</span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border border-dashed border-ivoire/15 p-10">
            <p className="label mb-4 text-ivoire/40">Statut</p>
            <p className="font-serif text-[26px] font-light text-ivoire">Modules non connectés</p>
            <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-ivoire/50">
              Aucune donnée de production n’est manipulée ici. Les prix, saveurs et décorations
              affichés côté public proviennent de <code className="text-ivoire/70">src/lib/data/*</code> et
              migreront vers Supabase sans changement d’interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
