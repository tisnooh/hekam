import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Informations pratiques',
  description: 'Livraison, retrait, allergènes, conservation et FAQ de la maison H-EKAM OAT.',
};

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-ivoire/10 pt-8">
      <h2 className="label mb-5 text-bronze">{title}</h2>
      <div className="max-w-[62ch] space-y-4 text-[14px] leading-relaxed text-ivoire/65">{children}</div>
    </section>
  );
}

export default function InformationsPage() {
  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[900px] space-y-12 px-5 pb-28 pt-32 md:px-10 md:pt-40">
        <div>
          <div className="mb-6 flex items-center gap-4">
          <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
          <p className="label-bronze">Informations</p>
        </div>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">
          Tout savoir avant de commander
        </h1>
        </div>

        <Block id="livraison" title="Livraison">
          <p>
            Nous livrons Paris intramuros (15 €) et la petite couronne (25 €), du mardi au samedi,
            par créneaux de deux heures. Nos créations voyagent en caisson réfrigéré et sont
            remises en main propre : une présence est requise à l’adresse indiquée.
          </p>
        </Block>
        <Block id="retrait" title="Retrait">
          <p>
            Le retrait est offert à la boutique, 12 rue des Artisans, 75011 Paris, du mardi au
            samedi de 10h à 19h. Votre création vous attend en vitrine réfrigérée, sous écrin
            siglé, avec son carton de transport.
          </p>
        </Block>
        <Block id="allergenes" title="Allergènes">
          <p>
            Nos ateliers manipulent gluten, œufs, lait, soja et fruits à coque. Chaque fiche
            création et chaque étape du configurateur indiquent les allergènes de votre
            composition. Pour toute allergie sévère, précisez-le dans les instructions atelier :
            nous vous dirons franchement ce qui est possible.
          </p>
        </Block>
        <Block id="conservation" title="Conservation">
          <p>
            Au réfrigérateur, dans leur boîte : 2 à 4 jours selon la création (le détail figure
            sur chaque fiche). Sortez votre gâteau 20 à 30 minutes avant le service : c’est à
            température de cave que les crèmes donnent tout leur parfum.
          </p>
        </Block>
        <Block id="faq" title="FAQ">
          <p>
            <strong className="font-normal text-ivoire/85">Quel délai pour commander ?</strong> 48 h pour les
            créations signatures, 72 h pour les pièces personnalisées, 3 semaines pour les pièces
            montées.
          </p>
          <p>
            <strong className="font-normal text-ivoire/85">Puis-je modifier ma commande ?</strong> Oui jusqu’à
            72 h avant la date choisie, depuis votre email de confirmation ou en boutique.
          </p>
          <p>
            <strong className="font-normal text-ivoire/85">Le configurateur est-il contractuel ?</strong> Il
            donne une direction fidèle à l’atelier ; chaque création étant façonnée à la main, de
            légères variations naturelles font partie de sa signature.
          </p>
        </Block>
      </div>
    </div>
  );
}
