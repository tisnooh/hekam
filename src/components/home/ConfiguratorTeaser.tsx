'use client';

import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

const STEPS = [
  { n: '01', label: 'Choisissez votre format' },
  { n: '02', label: 'Composez vos saveurs' },
  { n: '03', label: 'Personnalisez le design' },
  { n: '04', label: 'Visualisez votre création' },
  { n: '05', label: 'Commandez' },
];

/** Présentation du configurateur : texte à gauche, image pleine à droite. */
export default function ConfiguratorTeaser() {
  return (
    <section className="bg-noir">
      <div className="mx-auto grid max-w-[1720px] gap-16 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <Reveal className="flex flex-col justify-center">
          <div className="mb-7 flex items-center gap-4">
            <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
            <p className="label-bronze">Création sur mesure</p>
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.02] text-ivoire">
            Imaginez-le.
            <br />
            Nous le réalisons.
          </h2>
          <ol className="mt-16 max-w-md">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="flex items-baseline gap-7 border-t border-ivoire/[0.09] py-[18px] last:border-b"
              >
                <span className="font-sans text-[10px] tracking-[0.2em] text-bronze">{step.n}</span>
                <span className="text-[14.5px] text-ivoire/75">{step.label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <Link href="/creer-mon-gateau" className="btn-ghost">
              Créer mon gâteau
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative lg:-my-16">
          <div className="relative h-full overflow-hidden">
            <Image
              src="/images/editorial/hero-cake.jpg"
              alt="Création en cours de personnalisation à l'atelier"
              width={1400}
              height={1600}
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover object-[60%_40%] lg:min-h-[560px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
