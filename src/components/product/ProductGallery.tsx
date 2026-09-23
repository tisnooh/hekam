'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/** Grande galerie visuelle : fondu lent, aucune gymnastique. */
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative overflow-hidden bg-noir-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={images[active]}
              alt={`${name} — vue ${active + 1}`}
              width={1100}
              height={1375}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-4" role="tablist" aria-label={`Photographies de ${name}`}>
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Voir la photographie ${i + 1}`}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? 'border-b border-bronze pb-1 transition-all duration-500'
                  : 'border-b border-transparent pb-1 opacity-45 transition-all duration-500 hover:opacity-85'
              }
            >
              <Image src={img} alt="" width={160} height={200} className="h-[74px] w-[60px] object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
