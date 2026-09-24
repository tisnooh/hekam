'use client';

/**
 * Scène 3D paramétrique du gâteau (React Three Fiber + Drei).
 * Rendu studio : lightformers (reflets réalistes sans asset externe),
 * matière crème physique (velours / mate / lisse), spirale de crème pochée,
 * ombres douces, socle marbre. Géométrie procédurale : aucun .glb requis.
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, RoundedBox, Environment, Lightformer } from '@react-three/drei';
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

interface ShapeMeta {
  topY: number;
  baseR: number;
  band: 'round' | 'square';
  swirl: boolean;
}

const SHAPE_META: Record<ShapeId, ShapeMeta> = {
  rond: { topY: 1.25, baseR: 1.0, band: 'round', swirl: true },
  carre: { topY: 1.23, baseR: 1.05, band: 'square', swirl: false },
  coeur: { topY: 1.02, baseR: 1.0, band: 'round', swirl: false },
  'deux-etages': { topY: 1.82, baseR: 1.05, band: 'round', swirl: true },
  chiffre: { topY: 0.97, baseR: 0.75, band: 'round', swirl: false },
};

/** Micro-relief procédural (grain de crème) — généré en navigateur, zéro asset. */
function useFrostingBump(): THREE.CanvasTexture {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 120 + Math.random() * 60;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      // adoucit le grain par quelques passes de flou approximatif
      ctx.globalAlpha = 0.35;
      for (let k = 1; k < 4; k += 1) ctx.drawImage(canvas, k, k);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
  }, []);
}

/** Spirale de crème pochée sur le dessus (signature visuelle des photos). */
function CreamSwirl({ y, radius, material }: { y: number; radius: number; material: React.ReactNode }) {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const turns = 4.2;
    for (let t = 0; t <= 1; t += 0.01) {
      const a = t * turns * Math.PI * 2;
      const r = radius * (0.88 - 0.74 * t);
      pts.push(new THREE.Vector3(Math.cos(a) * r, y + 0.035 + t * 0.045, Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 220, 0.055, 10, false);
  }, [y, radius]);
  return (
    <mesh geometry={geo} castShadow>
      {material}
    </mesh>
  );
}

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

function CakeBody({ shape, material, swirlMaterial }: { shape: ShapeId; material: React.ReactNode; swirlMaterial: React.ReactNode }) {
  if (shape === 'carre') {
    return (
      <group>
        <RoundedBox args={[1.9, 1.15, 1.9]} radius={0.07} smoothness={4} position={[0, 0.575, 0]} castShadow>
          {material}
        </RoundedBox>
        <RoundedBox args={[1.97, 0.1, 1.97]} radius={0.04} smoothness={3} position={[0, 1.19, 0]} castShadow>
          {swirlMaterial}
        </RoundedBox>
      </group>
    );
  }
  if (shape === 'coeur') {
    const geo = useMemo(() => heartGeometry(), []);
    return (
      <mesh geometry={geo} position={[0, 0.62, 0]} scale={0.92} rotation={[0, Math.PI, 0]} castShadow>
        {material}
      </mesh>
    );
  }
  if (shape === 'deux-etages') {
    return (
      <group>
        <mesh position={[0, 0.475, 0]} castShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.95, 72]} />
          {material}
        </mesh>
        <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.035, 12, 72]} />
          {material}
        </mesh>
        <mesh position={[0, 1.37, 0]} castShadow>
          <cylinderGeometry args={[0.72, 0.72, 0.82, 72]} />
          {material}
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.08, 72]} />
          {swirlMaterial}
        </mesh>
        <CreamSwirl y={1.84} radius={0.7} material={swirlMaterial} />
      </group>
    );
  }
  if (shape === 'chiffre') {
    return (
      <group>
        <mesh position={[0, 0.475, 0.34]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.95, 56]} />
          {material}
        </mesh>
        <mesh position={[0, 0.475, -0.44]} castShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.95, 56]} />
          {material}
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh position={[0, 0.575, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 1.15, 72]} />
        {material}
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[1.03, 1.03, 0.1, 72]} />
        {swirlMaterial}
      </mesh>
      <mesh position={[0, 1.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.05, 12, 72]} />
        {swirlMaterial}
      </mesh>
      <CreamSwirl y={1.25} radius={1.0} material={swirlMaterial} />
    </group>
  );
}

function Decorations({ config, meta }: { config: CakeConfiguration; meta: ShapeMeta }) {
  const secondary = paletteHex(config.decoration.secondaryColor);
  const gold = '#A7793D';
  const opts = config.decoration.options;

  const goldMat = <meshStandardMaterial color={gold} metalness={1} roughness={0.18} envMapIntensity={1.35} />;
  const petalMat = <meshPhysicalMaterial color={secondary} roughness={0.5} sheen={0.8} sheenColor="#ffffff" sheenRoughness={0.4} />;
  const fruitMat = <meshPhysicalMaterial color="#7E2A33" roughness={0.25} clearcoat={0.9} clearcoatRoughness={0.2} />;

  return (
    <group>
      {opts.includes('dorure') &&
        (meta.band === 'square' ? (
          <mesh position={[0, meta.topY - 0.02, 0]}>{<boxGeometry args={[1.99, 0.025, 1.99]} />}{goldMat}</mesh>
        ) : (
          <mesh position={[0, meta.topY - 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[meta.baseR * 0.99, 0.02, 12, 72]} />
            {goldMat}
          </mesh>
        ))}

      {opts.includes('ruban') &&
        (meta.band === 'square' ? (
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[1.94, 0.24, 1.94]} />
            <meshPhysicalMaterial color={secondary} roughness={0.45} sheen={0.6} sheenColor="#ffffff" />
          </mesh>
        ) : (
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[meta.baseR + 0.015, meta.baseR + 0.015, 0.24, 72, 1, true]} />
            <meshPhysicalMaterial color={secondary} roughness={0.45} sheen={0.6} sheenColor="#ffffff" side={THREE.DoubleSide} />
          </mesh>
        ))}

      {opts.includes('perles') && (
        <group>
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            const r = meta.band === 'square' ? 1.0 : meta.baseR + 0.03;
            const x = meta.band === 'square' ? Math.max(-1, Math.min(1, Math.cos(a) * 1.3)) * 0.98 : Math.cos(a) * r;
            const z = meta.band === 'square' ? Math.max(-1, Math.min(1, Math.sin(a) * 1.3)) * 0.98 : Math.sin(a) * r;
            return (
              <mesh key={i} position={[x, 0.045, z]}>
                <sphereGeometry args={[0.045, 18, 18]} />
                <meshPhysicalMaterial color={secondary} roughness={0.3} clearcoat={0.6} />
              </mesh>
            );
          })}
        </group>
      )}

      {opts.includes('fleurs') && (
        <group>
          {[
            [-0.45, meta.topY + 0.08, 0.15],
            [0.1, meta.topY + 0.11, -0.3],
            [0.45, meta.topY + 0.07, 0.25],
          ].map(([x, y, z], i) => (
            <group key={i} position={[x, y, z]}>
              {Array.from({ length: 6 }).map((_, p) => (
                <mesh key={p} rotation={[0, (p * Math.PI * 2) / 6, 0.55]} scale={[1, 0.45, 0.62]}>
                  <sphereGeometry args={[0.1, 14, 14]} />
                  {petalMat}
                </mesh>
              ))}
              <mesh>
                <sphereGeometry args={[0.045, 14, 14]} />
                {goldMat}
              </mesh>
            </group>
          ))}
        </group>
      )}

      {opts.includes('fruits') && (
        <group>
          {[
            [-0.35, meta.topY + 0.06, 0.2],
            [0.05, meta.topY + 0.08, -0.25],
            [0.4, meta.topY + 0.05, 0.15],
            [-0.1, meta.topY + 0.06, 0.4],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[0.07, 18, 18]} />
              {fruitMat}
            </mesh>
          ))}
        </group>
      )}

      {(opts.includes('topper') || config.message.topper) && (
        <group position={[0, meta.topY + (meta.swirl ? 0.06 : 0), 0]}>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.48, 12]} />
            {goldMat}
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <octahedronGeometry args={[0.11]} />
            {goldMat}
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function CakeStudioScene({ configuration }: { configuration: CakeConfiguration }) {
  const shape: ShapeId = configuration.shape ?? 'rond';
  const main = paletteHex(configuration.decoration.mainColor);
  const finish = configuration.decoration.finish ?? 'mate';
  const scale = configuration.size ? SIZE_SCALE[configuration.size] : 0.95;
  const meta = SHAPE_META[shape];
  const bump = useFrostingBump();

  // Matière crème physique selon la finition
  const material = (
    <meshPhysicalMaterial
      color={main}
      roughness={finish === 'lisse' ? 0.32 : finish === 'velours' ? 1 : 0.68}
      metalness={0}
      clearcoat={finish === 'lisse' ? 0.42 : 0}
      clearcoatRoughness={0.25}
      sheen={finish === 'velours' ? 1 : 0.55}
      sheenColor="#fff1dc"
      sheenRoughness={finish === 'velours' ? 0.85 : 0.5}
      bumpMap={bump}
      bumpScale={finish === 'velours' ? 0.035 : finish === 'lisse' ? 0.006 : 0.016}
      envMapIntensity={0.85}
    />
  );
  const swirlMaterial = (
    <meshPhysicalMaterial
      color={main}
      roughness={finish === 'lisse' ? 0.36 : 0.75}
      sheen={0.7}
      sheenColor="#fff1dc"
      sheenRoughness={0.45}
      bumpMap={bump}
      bumpScale={0.02}
      envMapIntensity={0.8}
    />
  );

  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.75, 4.7], fov: 34 }} gl={{ antialias: true, alpha: true }}>
      {/* Studio : lumière chaude + panneaux réfléchis dans les matières */}
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[4, 7, 4]}
        intensity={1.5}
        color="#FFE9C9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#A7793D" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[6, 6, 1]} color="#FFF4E0" />
        <Lightformer form="rect" intensity={1.1} position={[-4, 1.6, 2]} rotation={[0, Math.PI / 3, 0]} scale={[4, 2.2, 1]} color="#FFE9C9" />
        <Lightformer form="rect" intensity={0.7} position={[4, 1.2, -2]} rotation={[0, -Math.PI / 2.5, 0]} scale={[3, 2, 1]} color="#C99A5B" />
      </Environment>

      {/* Sol sombre receiving shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color="#0B0A09" roughness={0.62} metalness={0.1} />
      </mesh>

      <group scale={scale}>
        {/* Socle marbre noir + anneau bronze */}
        <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.6, 1.7, 0.14, 72]} />
          <meshPhysicalMaterial color="#16120E" roughness={0.34} clearcoat={0.5} clearcoatRoughness={0.3} envMapIntensity={0.7} />
        </mesh>
        <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.62, 0.015, 12, 80]} />
          <meshStandardMaterial color="#A7793D" metalness={1} roughness={0.22} envMapIntensity={1.3} />
        </mesh>

        <group position={[0, 0.14, 0]}>
          <CakeBody shape={shape} material={material} swirlMaterial={swirlMaterial} />
          <Decorations config={configuration} meta={meta} />
        </group>
      </group>

      <ContactShadows position={[0, 0.002, 0]} opacity={0.42} scale={7} blur={2.7} far={3} color="#000000" />

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
