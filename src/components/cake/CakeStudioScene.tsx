'use client';

/**
 * Scène 3D paramétrique du gâteau (React Three Fiber + Drei).
 * Géométrie procédurale : aucune dépendance à un fichier .glb.
 * Formes, teintes, finitions, options et format modifient le rendu en direct.
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import type { CakeConfiguration, ShapeId, SizeId } from '@/lib/types';
import { paletteHex } from '@/lib/data/decorations';

const SIZE_SCALE: Record<SizeId, number> = {
  p4: 0.82,
  'p6-8': 0.95,
  'p10-12': 1.08,
  'p15-20': 1.2,
  p25: 1.32,
};

const FINISH_ROUGHNESS = { lisse: 0.38, mate: 0.65, velours: 0.94 } as const;

interface ShapeMeta {
  topY: number;
  baseR: number;
  band: 'round' | 'square';
}

const SHAPE_META: Record<ShapeId, ShapeMeta> = {
  rond: { topY: 1.25, baseR: 1.0, band: 'round' },
  carre: { topY: 1.23, baseR: 1.05, band: 'square' },
  coeur: { topY: 1.02, baseR: 1.0, band: 'round' },
  'deux-etages': { topY: 1.82, baseR: 1.05, band: 'round' },
  chiffre: { topY: 0.97, baseR: 0.75, band: 'round' },
};

function heartGeometry(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0.42);
  s.bezierCurveTo(0.5, 0.92, 1.12, 0.46, 1.12, 0.02);
  s.bezierCurveTo(1.12, -0.42, 0.52, -0.78, 0, -1.08);
  s.bezierCurveTo(-0.52, -0.78, -1.12, -0.42, -1.12, 0.02);
  s.bezierCurveTo(-1.12, 0.46, -0.5, 0.92, 0, 0.42);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.95,
    bevelEnabled: true,
    bevelSize: 0.07,
    bevelThickness: 0.07,
    bevelSegments: 3,
    curveSegments: 40,
  });
  geo.rotateX(-Math.PI / 2);
  geo.center();
  return geo;
}

function CakeBody({ shape, material }: { shape: ShapeId; material: React.ReactNode }) {
  if (shape === 'carre') {
    return (
      <group>
        <RoundedBox args={[1.9, 1.15, 1.9]} radius={0.07} smoothness={4} position={[0, 0.575, 0]}>
          {material}
        </RoundedBox>
        <RoundedBox args={[1.97, 0.1, 1.97]} radius={0.04} smoothness={3} position={[0, 1.19, 0]}>
          {material}
        </RoundedBox>
      </group>
    );
  }
  if (shape === 'coeur') {
    const geo = useMemo(() => heartGeometry(), []);
    return (
      <mesh geometry={geo} position={[0, 0.62, 0]} scale={0.92} rotation={[0, Math.PI, 0]}>
        {material}
      </mesh>
    );
  }
  if (shape === 'deux-etages') {
    return (
      <group>
        <mesh position={[0, 0.475, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.95, 64]} />
          {material}
        </mesh>
        <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.035, 12, 64]} />
          {material}
        </mesh>
        <mesh position={[0, 1.37, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.82, 64]} />
          {material}
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.08, 64]} />
          {material}
        </mesh>
      </group>
    );
  }
  if (shape === 'chiffre') {
    // Aperçu symbolique : deux disques extrudés composant un « 8 » vu du dessus.
    return (
      <group>
        <mesh position={[0, 0.475, 0.34]}>
          <cylinderGeometry args={[0.6, 0.6, 0.95, 48]} />
          {material}
        </mesh>
        <mesh position={[0, 0.475, -0.44]}>
          <cylinderGeometry args={[0.48, 0.48, 0.95, 48]} />
          {material}
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh position={[0, 0.575, 0]}>
        <cylinderGeometry args={[1, 1, 1.15, 64]} />
        {material}
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[1.03, 1.03, 0.1, 64]} />
        {material}
      </mesh>
      <mesh position={[0, 1.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.05, 12, 64]} />
        {material}
      </mesh>
    </group>
  );
}

function Decorations({ config, meta }: { config: CakeConfiguration; meta: ShapeMeta }) {
  const secondary = paletteHex(config.decoration.secondaryColor);
  const gold = '#A7793D';
  const opts = config.decoration.options;

  return (
    <group>
      {opts.includes('dorure') &&
        (meta.band === 'square' ? (
          <mesh position={[0, meta.topY - 0.02, 0]}>
            <boxGeometry args={[1.99, 0.025, 1.99]} />
            <meshStandardMaterial color={gold} metalness={0.95} roughness={0.28} />
          </mesh>
        ) : (
          <mesh position={[0, meta.topY - 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[meta.baseR * 0.99, 0.02, 12, 64]} />
            <meshStandardMaterial color={gold} metalness={0.95} roughness={0.28} />
          </mesh>
        ))}

      {opts.includes('ruban') &&
        (meta.band === 'square' ? (
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[1.94, 0.24, 1.94]} />
            <meshStandardMaterial color={secondary} roughness={0.55} />
          </mesh>
        ) : (
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[meta.baseR + 0.015, meta.baseR + 0.015, 0.24, 64, 1, true]} />
            <meshStandardMaterial color={secondary} roughness={0.55} side={THREE.DoubleSide} />
          </mesh>
        ))}

      {opts.includes('perles') && (
        <group>
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const r = meta.band === 'square' ? 1.0 : meta.baseR + 0.03;
            const x = meta.band === 'square' ? Math.max(-1, Math.min(1, Math.cos(a) * 1.3)) * 0.98 : Math.cos(a) * r;
            const z = meta.band === 'square' ? Math.max(-1, Math.min(1, Math.sin(a) * 1.3)) * 0.98 : Math.sin(a) * r;
            return (
              <mesh key={i} position={[x, 0.045, z]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color={secondary} roughness={0.35} />
              </mesh>
            );
          })}
        </group>
      )}

      {opts.includes('fleurs') && (
        <group>
          {[
            [-0.45, meta.topY + 0.06, 0.15],
            [0.1, meta.topY + 0.09, -0.3],
            [0.45, meta.topY + 0.05, 0.25],
          ].map(([x, y, z], i) => (
            <group key={i} position={[x, y, z]}>
              {Array.from({ length: 5 }).map((_, p) => (
                <mesh key={p} rotation={[0, (p * Math.PI * 2) / 5, 0.5]}>
                  <sphereGeometry args={[0.09, 12, 12]} />
                  <meshStandardMaterial color={secondary} roughness={0.5} />
                </mesh>
              ))}
              <mesh>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color={gold} roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {opts.includes('fruits') && (
        <group>
          {[
            [-0.35, meta.topY + 0.05, 0.2],
            [0.05, meta.topY + 0.07, -0.25],
            [0.4, meta.topY + 0.04, 0.15],
            [-0.1, meta.topY + 0.05, 0.4],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#7E2A33" roughness={0.35} />
            </mesh>
          ))}
        </group>
      )}

      {(opts.includes('topper') || config.message.topper) && (
        <group position={[0, meta.topY, 0]}>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.48, 12]} />
            <meshStandardMaterial color={gold} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <octahedronGeometry args={[0.11]} />
            <meshStandardMaterial color={gold} metalness={0.95} roughness={0.22} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function CakeStudioScene({ configuration }: { configuration: CakeConfiguration }) {
  const shape: ShapeId = configuration.shape ?? 'rond';
  const main = paletteHex(configuration.decoration.mainColor);
  const roughness = FINISH_ROUGHNESS[configuration.decoration.finish ?? 'mate'];
  const scale = configuration.size ? SIZE_SCALE[configuration.size] : 0.95;
  const meta = SHAPE_META[shape];

  const material = <meshStandardMaterial color={main} roughness={roughness} metalness={0.02} />;

  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.8, 4.8], fov: 34 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 7, 4]} intensity={1.15} color="#FFF6E8" />
      <pointLight position={[-5, 3, -5]} intensity={0.45} color="#A7793D" />

      <group scale={scale}>
        {/* Socle */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[1.6, 1.7, 0.14, 64]} />
          <meshStandardMaterial color="#16120E" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.62, 0.015, 12, 72]} />
          <meshStandardMaterial color="#A7793D" metalness={0.9} roughness={0.3} />
        </mesh>

        <group position={[0, 0.14, 0]}>
          <CakeBody shape={shape} material={material} />
          <Decorations config={configuration} meta={meta} />
        </group>
      </group>

      <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={7} blur={2.6} far={3} color="#000000" />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={3.4}
        maxDistance={6.5}
        minPolarAngle={1.02}
        maxPolarAngle={1.62}
        rotateSpeed={0.55}
        zoomSpeed={0.6}
        target={[0, 0.75, 0]}
      />
    </Canvas>
  );
}
