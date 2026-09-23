'use client';

import Image from 'next/image';
import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';
import { useRef } from 'react';

const ROW_A = [
  { src: '/images/editorial/gallery-texture.jpg', alt: 'Texture de crème chocolat tourbillonnée, macro', ratio: 'aspect-square' },
  { src: '/images/editorial/gallery-detail.jpg', alt: 'Fleur en sucre et perles déposées à la main, macro', ratio: 'aspect-[4/5]' },
  { src: '/images/editorial/gallery-full-cake.jpg', alt: 'Création entière posée sur un piédestal, lumière rasante', ratio: 'aspect-square' },
];

const ROW_B = [
  { src: '/images/editorial/gallery-preparation.jpg', alt: 'Main lissant une crème ivoire à la spatule, atelier', ratio: 'aspect-[4/5]' },
  { src: '/images/editorial/gallery-packaging.jpg', alt: 'Écrin ivoire et ruban bronze de la maison', ratio: 'aspect-square' },
  { src: '/images/products/intense.jpg', alt: "Détail d'une ganache grand cru, reflet doux", ratio: 'aspect-square' },
];

/** Galerie immersive : deux registres, formats mêlés, parallaxe ±24 px. */
export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-24, 24]);
  const yB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  return (
    <section ref={ref} className="overflow-hidden bg-noir-soft" aria-label="Galerie de la maison">
      <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-10 md:py-36">
        <div className="mb-16 flex items-center justify-center gap-4">
          <span className="block h-px w-10 bg-bronze/60" aria-hidden="true" />
          <p className="label text-ivoire/40">L’atelier, en détails</p>
          <span className="block h-px w-10 bg-bronze/60" aria-hidden="true" />
        </div>

        <motion.div style={{ y: yA }} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {ROW_A.map((img, i) => (
            <div key={img.src} className={i === 1 ? 'md:mt-16' : ''}>
              <Image src={img.src} alt={img.alt} width={900} height={900} loading="lazy" className={`${img.ratio} w-full object-cover`} />
            </div>
          ))}
        </motion.div>

        <motion.div style={{ y: yB }} className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-3 md:gap-5">
          {ROW_B.map((img, i) => (
            <div key={img.src} className={i === 0 ? 'md:mt-16' : ''}>
              <Image src={img.src} alt={img.alt} width={900} height={900} loading="lazy" className={`${img.ratio} w-full object-cover`} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
