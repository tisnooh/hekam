'use client';

import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

/** Composition asymétrique : photographie dominante + texte resserré. */
export default function SavoirFaire() {
  return (
    <section id="savoir-faire" className="bg-creme text-brun">
      <div className="mx-auto max-w-[1720px] px-6 py-28 md:px-10 md:py-44">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7 xl:col-span-8">
            <Image
              src="/images/editorial/savoir-faire.jpg"
              alt="Mains d'un pâtissier dressant une crème ivoire à la poche, atelier sombre"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover lg:aspect-[16/11]"
            />
            <p className="label mt-5 text-brun/40">L’atelier, Paris XIᵉ</p>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-center lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10">
            <div className="mb-7 flex items-center gap-4">
              <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
              <p className="label-bronze">Savoir-faire</p>
            </div>
            <h2 className="font-serif text-[clamp(34px,3.6vw,46px)] font-light leading-[1.1]">
              Pensé à l’écran.
              <br />
              Façonné à la main.
            </h2>
            <span className="my-9 block h-px w-14 bg-bronze/60" aria-hidden="true" />
            <p className="max-w-[36ch] text-[14.5px] leading-[1.9] text-brun/75">
              Votre création numérique devient une pièce réelle : chaque biscuit est
              cuit le matin, chaque crème montée à la minute, chaque détail posé à la
              main par un seul pâtissier, du début à la fin.
            </p>
            <p className="mt-6 max-w-[36ch] text-[14.5px] leading-[1.9] text-brun/55">
              Aucune préparation à l’avance, aucun stock : seulement votre commande,
              et le temps qu’elle mérite.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
