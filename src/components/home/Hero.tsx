'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero : le gâteau domine, le texte s'efface à gauche.
 * Composition éditoriale : un label, un titre, une phrase, un CTA. Rien de plus.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-noir">
      <div className="absolute inset-0">
        <Image
          src="/images/editorial/hero-cake.jpg"
          alt="Création sur mesure H-EKAM OAT — gâteau ivoire sculpté, pétales de chocolat bronze"
          priority
          fill
          className="object-cover object-[62%_38%] md:object-[68%_35%]"
          sizes="100vw"
        />
        {/* Le noir habille le texte sans éteindre le gâteau */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/45 to-transparent md:via-noir/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-noir to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-noir/70 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1720px] px-6 pb-20 md:px-10 md:pb-24">
        <div className="max-w-2xl">
          <motion.div {...item(0.25)} className="flex items-center gap-4">
            <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
            <p className="label text-bronze-clair">Pâtisserie sur mesure</p>
          </motion.div>

          <motion.h1
            {...item(0.4)}
            className="mt-8 font-serif font-light leading-[0.98] text-ivoire text-[clamp(54px,8.5vw,116px)]"
          >
            Votre gâteau.
            <br />
            Votre <em className="italic text-creme">création.</em>
          </motion.h1>

          <motion.p {...item(0.58)} className="mt-8 max-w-[40ch] text-[15px] leading-[1.8] text-ivoire/60">
            Imaginez-le, personnalisez chaque détail, visualisez-le sous tous les
            angles et nous le réalisons pour vos plus beaux moments.
          </motion.p>

          <motion.div {...item(0.74)} className="mt-12 flex flex-wrap items-center gap-8">
            <Link href="/creer-mon-gateau" className="btn-primary !px-10 !py-[18px]">
              Créer mon gâteau
            </Link>
            <Link
              href="/creations"
              className="label link-underline text-ivoire/60 transition-colors duration-500 hover:text-ivoire"
            >
              Découvrir nos créations
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Repère de lecture discret, aligné sur la grille */}
      <motion.div
        {...item(1)}
        className="pointer-events-none absolute bottom-0 right-6 hidden flex-col items-center gap-4 md:right-10 md:flex"
        aria-hidden="true"
      >
        <span className="label [writing-mode:vertical-rl] text-ivoire/30">Défiler</span>
        <span className="block h-16 w-px bg-gradient-to-b from-ivoire/30 to-transparent" />
      </motion.div>
    </section>
  );
}
