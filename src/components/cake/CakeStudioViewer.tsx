'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import DemoCakeVisual from '@/components/cake/DemoCakeVisual';
import Icon from '@/components/ui/Icon';
import type { CakeConfiguration } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * CakeStudioViewer — visualisation 3D temps réel du configurateur.
 * - Rendu procédural React Three Fiber (socle, formes, matières, ombres,
 *   lumière studio), rotation souris/tactile et zoom limité.
 * - Si WebGL est indisponible : repli propre sur l'aperçu 2D paramétrique.
 * - Si NEXT_PUBLIC_CAKE_MODEL_URL est défini, un modèle .glb pourra remplacer
 *   la scène procédurale (architecture prévue, voir public/models/README.md).
 */
const CakeStudioScene = dynamic(() => import('@/components/cake/CakeStudioScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="label text-ivoire/35">Chargement de la visualisation…</p>
    </div>
  ),
});

function webglSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

interface CakeStudioViewerProps {
  configuration: CakeConfiguration;
  className?: string;
}

export default function CakeStudioViewer({ configuration, className }: CakeStudioViewerProps) {
  const supported = useMemo(() => (typeof window === 'undefined' ? true : webglSupported()), []);
  const { shape, message } = configuration;

  return (
    <div className={cn('relative h-full w-full select-none', className)}>
      {supported ? (
        <CakeStudioScene configuration={configuration} />
      ) : (
        <>
          <DemoCakeVisual configuration={configuration} />
          <p className="label absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-ivoire/35">
            Rendu 3D indisponible sur cet appareil — aperçu 2D
          </p>
        </>
      )}

      {shape === 'chiffre' && (
        <p className="label pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap bg-noir/70 px-3 py-1.5 text-ivoire/60 backdrop-blur-sm">
          Aperçu symbolique — chiffre exact façonné à l’atelier
        </p>
      )}

      {message.text.trim() && (
        <p
          className="pointer-events-none absolute bottom-9 left-1/2 max-w-[80%] -translate-x-1/2 truncate border border-bronze/40 bg-ivoire px-5 py-2 font-serif text-[15px] italic text-brun shadow-lg"
          aria-label={`Message sur le gâteau : ${message.text}`}
        >
          {message.text}
        </p>
      )}

      <p className="label pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-ivoire/35">
        <Icon name="rotate" size={12} />
        Glissez pour tourner · molette pour zoomer
      </p>
    </div>
  );
}
