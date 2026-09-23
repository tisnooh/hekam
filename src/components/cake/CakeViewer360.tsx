'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSpring, motion } from 'framer-motion';
import DemoCakeVisual from '@/components/cake/DemoCakeVisual';
import Icon from '@/components/ui/Icon';
import type { CakeConfiguration } from '@/lib/types';
import { clamp, cn } from '@/lib/utils';

/**
 * CakeViewer360 — visualisation du gâteau.
 *
 * Architecture prête pour la 3D :
 * - si NEXT_PUBLIC_CAKE_MODEL_URL est défini (fichier .glb / .gltf dans /public),
 *   le rendu React Three Fiber (CakeModel3D) est chargé dynamiquement ;
 * - sinon, visualisation de démonstration paramétrique, clairement signalée
 *   comme telle dans l'interface (pas de fausse 3D).
 *
 * Rotation : souris, doigt (pointer events) et clavier (flèches).
 */
const MODEL_URL = process.env.NEXT_PUBLIC_CAKE_MODEL_URL;

const CakeModel3D = MODEL_URL
  ? dynamic(() => import('@/components/cake/CakeModel3D'), { ssr: false, loading: () => null })
  : null;

interface CakeViewer360Props {
  configuration: CakeConfiguration;
  interactive?: boolean;
  className?: string;
  showHint?: boolean;
  idPrefix?: string;
}

export default function CakeViewer360({
  configuration,
  interactive = true,
  className,
  showHint = true,
  idPrefix = 'viewer',
}: CakeViewer360Props) {
  const [dragging, setDragging] = useState(false);
  const rotation = useSpring(0, { stiffness: 110, damping: 18 });
  const lastX = useRef(0);
  const frame = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!interactive) return;
      setDragging(true);
      lastX.current = e.clientX;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [interactive],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      rotation.set(clamp(rotation.get() + dx * 0.3, -30, 30));
    },
    [dragging, rotation],
  );

  const endDrag = useCallback(() => setDragging(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!interactive || document.activeElement !== frame.current) return;
      if (e.key === 'ArrowLeft') rotation.set(clamp(rotation.get() - 6, -30, 30));
      if (e.key === 'ArrowRight') rotation.set(clamp(rotation.get() + 6, -30, 30));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [interactive, rotation]);

  return (
    <div className={cn('relative h-full w-full select-none', className)}>
      <motion.div
        ref={frame}
        tabIndex={interactive ? 0 : -1}
        role="img"
        aria-label="Visualisation du gâteau en cours de création. Utilisez les flèches gauche et droite pour le tourner."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        style={{ rotateY: CakeModel3D ? undefined : rotation, perspective: CakeModel3D ? undefined : 1100 }}
        className={cn(
          'h-full w-full outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-bronze/60',
          interactive && (dragging ? 'cursor-grabbing' : 'cursor-grab'),
        )}
      >
        {CakeModel3D ? (
          <CakeModel3D configuration={configuration} modelUrl={MODEL_URL ?? ''} />
        ) : (
          <DemoCakeVisual configuration={configuration} idPrefix={idPrefix} />
        )}
      </motion.div>

      {showHint && interactive && (
        <p className="label pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-ivoire/35">
          <Icon name="rotate" size={13} />
          Glissez pour tourner · aperçu de démonstration
        </p>
      )}
    </div>
  );
}
