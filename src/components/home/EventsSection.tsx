'use client';

import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

/** Quatre moments, composition éditoriale asymétrique — aucun rectangle identique. */
export default function EventsSection() {
  return (
    <section id="evenements" className="bg-noir">
      <div className="mx-auto max-w-[1720px] px-6 py-28 md:px-10 md:py-44">
        <Reveal className="max-w-2xl">
          <div className="mb-7 flex items-center gap-4">
            <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
            <p className="label-bronze">Événements</p>
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.02] text-ivoire">
            Pour chaque moment important.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-28 md:grid-cols-12 md:gap-10">
          {/* Mariage — grande image */}
          <Reveal className="md:col-span-6 md:row-span-2">
            <Link href="/creer-mon-gateau?occasion=mariage" className="group block">
              <div className="overflow-hidden">
                <Image
                  src="/images/events/mariage.jpg"
                  alt="Pièce montée ivoire drapée, mariage"
                  width={1100}
                  height={1375}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.02]"
                />
              </div>
              <p className="label mt-6 text-bronze-clair">Mariage</p>
              <p className="mt-3 max-w-[38ch] text-[13.5px] leading-relaxed text-ivoire/55">
                Pièces montées, étages drapés et fleurs fraîches, livrés et montés sur place.
              </p>
            </Link>
          </Reveal>

          {/* Anniversaire — bloc texte */}
          <Reveal delay={0.1} className="flex flex-col justify-end md:col-span-3 md:col-start-8 md:pb-20">
            <p className="font-serif text-[clamp(28px,2.6vw,38px)] font-light leading-tight text-ivoire">Anniversaire</p>
            <span className="my-6 block h-px w-12 bg-bronze/60" aria-hidden="true" />
            <p className="text-[13.5px] leading-relaxed text-ivoire/55">
              Chiffres, bougies fines, messages pochés : une pièce personnelle, jamais kitsch.
            </p>
            <Link
              href="/creer-mon-gateau?occasion=anniversaire"
              className="label link-underline mt-7 self-start text-bronze-clair"
            >
              Composer
            </Link>
          </Reveal>

          {/* Baby shower — image décalée */}
          <Reveal delay={0.18} className="md:col-span-3 md:mt-28">
            <Link href="/creer-mon-gateau?occasion=baby-shower" className="group block">
              <div className="overflow-hidden">
                <Image
                  src="/images/products/nuage.jpg"
                  alt="Création douce teintes poudrées, baby shower"
                  width={900}
                  height={1125}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.02]"
                />
              </div>
              <p className="label mt-6 text-bronze-clair">Baby shower</p>
            </Link>
          </Reveal>

          {/* Entreprise — bloc texte */}
          <Reveal delay={0.12} className="flex flex-col justify-start md:col-span-4 md:col-start-8 md:pt-14">
            <p className="font-serif text-[clamp(28px,2.6vw,38px)] font-light leading-tight text-ivoire">
              Événement professionnel
            </p>
            <span className="my-6 block h-px w-12 bg-bronze/60" aria-hidden="true" />
            <p className="text-[13.5px] leading-relaxed text-ivoire/55">
              Logo comestible, couleurs de maison, formats pour vingt à cent collaborateurs.
              Facture et compte pro disponibles.
            </p>
            <Link
              href="/creer-mon-gateau?occasion=entreprise"
              className="label link-underline mt-7 self-start text-bronze-clair"
            >
              Composer
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
