'use client';

/**
 * Rendu 3D temps réel (React Three Fiber + Drei).
 * Chargé uniquement si NEXT_PUBLIC_CAKE_MODEL_URL pointe vers un fichier
 * .glb / .gltf déposé dans /public (ex. /models/cake.glb).
 *
 * Ce fichier est volontairement isolé : il n'entre jamais dans le bundle
 * tant que la variable d'environnement n'est pas définie.
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import type { CakeConfiguration } from '@/lib/types';
import { paletteHex } from '@/lib/data/decorations';

function CakeModel({ modelUrl, configuration }: { modelUrl: string; configuration: CakeConfiguration }) {
  const { scene } = useGLTF(modelUrl);
  const main = paletteHex(configuration.decoration.mainColor);
  return (
    <primitive
      object={scene}
      scale={configuration.shape === 'deux-etages' ? 1 : 0.85}
      // Teinte de base appliquée au matériau principal du modèle
      onBeforeCompile={(shader: { fragmentShader: string }) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           diffuseColor.rgb = mix(diffuseColor.rgb, vec3(${hexToGl(main)}), 0.35);`,
        );
      }}
    />
  );
}

function hexToGl(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}`;
}

export default function CakeModel3D({
  configuration,
  modelUrl,
}: {
  configuration: CakeConfiguration;
  modelUrl: string;
}) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1.4, 4.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} color="#f4efe8" />
      <pointLight position={[-4, 2, -3]} intensity={0.4} color="#a7793d" />
      <Suspense fallback={null}>
        <CakeModel modelUrl={modelUrl} configuration={configuration} />
        <ContactShadows position={[0, -0.9, 0]} opacity={0.6} scale={8} blur={2.4} far={2} color="#000000" />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
