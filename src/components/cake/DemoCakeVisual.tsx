'use client';

import { useMemo } from 'react';
import type { CakeConfiguration } from '@/lib/types';
import { paletteHex } from '@/lib/data/decorations';
import { cn } from '@/lib/utils';

interface DemoCakeVisualProps {
  configuration: CakeConfiguration;
  /** Angle de rotation (deg) appliqué par le parent (drag / clavier) */
  rotation?: number;
  className?: string;
  idPrefix?: string;
}

/**
 * Visualisation de démonstration (2D paramétrique).
 * Elle reflète honnêtement la configuration choisie (forme, étages,
 * teintes, finition, options, message) en attendant les modèles 3D .glb.
 * Ce n'est PAS un rendu 3D temps réel : CakeViewer360 l'indique dans l'UI.
 */
export default function DemoCakeVisual({
  configuration,
  rotation = 0,
  className,
  idPrefix = 'cake',
}: DemoCakeVisualProps) {
  const { shape, decoration, message } = configuration;
  const main = paletteHex(decoration.mainColor);
  const secondary = paletteHex(decoration.secondaryColor);
  const tiers = shape === 'deux-etages' ? 2 : 1;
  const uid = `${idPrefix}-${shape}`;

  const shade = useMemo(() => {
    // Assombrir légèrement une couleur hex pour les faces latérales
    const n = parseInt(main.slice(1), 16);
    const f = (v: number) => Math.max(0, Math.round(v * 0.82));
    const r = f((n >> 16) & 255);
    const g = f((n >> 8) & 255);
    const b = f(n & 255);
    return `rgb(${r} ${g} ${b})`;
  }, [main]);

  const has = (opt: string) => decoration.options.includes(opt as never);

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={`Aperçu de la création : forme ${shape}, teinte ${decoration.mainColor}, style ${decoration.style}`}
      style={{ transform: `perspective(900px) rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
    >
      <defs>
        <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade} />
          <stop offset="0.35" stopColor={main} />
          <stop offset="0.75" stopColor={main} />
          <stop offset="1" stopColor={shade} />
        </linearGradient>
        <radialGradient id={`${uid}-top`} cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor={main} />
        </radialGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Socle */}
      <ellipse cx="200" cy="330" rx="150" ry="16" fill="#000" opacity="0.55" />
      <ellipse cx="200" cy="326" rx="132" ry="13" fill="#141210" />
      <ellipse cx="200" cy="323" rx="132" ry="12" fill="#1E1A16" />

      {tiers === 2 && (
        <g>
          {/* Étage inférieur */}
          <TierShape shape={shape} uid={uid} top={210} height={112} rx={118} secondary={secondary} decoration={decoration} has={has} />
          {/* Étage supérieur */}
          <TierShape shape={shape} uid={uid} top={128} height={86} rx={78} secondary={secondary} decoration={decoration} has={has} />
        </g>
      )}
      {tiers === 1 && (
        <TierShape shape={shape} uid={uid} top={170} height={152} rx={112} secondary={secondary} decoration={decoration} has={has} />
      )}

      {/* Message sur le gâteau */}
      {message.text.trim() && (
        <text
          x="200"
          y={tiers === 2 ? 262 : 258}
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontSize="19"
          fill={message.color === 'bronze' ? '#A7793D' : message.color === 'ivoire' ? '#F4EFE8' : '#382217'}
        >
          {message.text.trim()}
        </text>
      )}

      {/* Topper */}
      {(has('topper') || message.topper) && (
        <g stroke="#A7793D" strokeWidth="2" fill="none">
          <path d="M200 96 V 66" />
          <path d="M200 52 l9 10 -9 10 -9 -10 z" fill="#A7793D" stroke="none" opacity="0.9" />
        </g>
      )}
    </svg>
  );
}

function TierShape({
  shape,
  uid,
  top,
  height,
  rx,
  secondary,
  decoration,
  has,
}: {
  shape: string;
  uid: string;
  top: number;
  height: number;
  rx: number;
  secondary: string;
  decoration: CakeConfiguration['decoration'];
  has: (opt: string) => boolean;
}) {
  const cx = 200;
  const ry = rx * 0.26;
  const bottom = top + height;
  const square = shape === 'carre';
  const velours = decoration.finish === 'velours';

  const body = square ? (
    <rect x={cx - rx} y={top} width={rx * 2} height={height} fill={`url(#${uid}-side)`} />
  ) : (
    <path
      d={`M ${cx - rx} ${top} V ${bottom} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} V ${top} Z`}
      fill={`url(#${uid}-side)`}
    />
  );

  return (
    <g filter={velours ? `url(#${uid}-grain)` : undefined}>
      {body}
      {/* Texture de surface */}
      {decoration.texture === 'strie' && (
        <g stroke="#00000022" strokeWidth="1.4">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={cx - rx + ((i + 1) * rx * 2) / 10} y1={top + 6} x2={cx - rx + ((i + 1) * rx * 2) / 10} y2={bottom - 4} />
          ))}
        </g>
      )}
      {decoration.texture === 'vague' && (
        <g stroke="#00000020" strokeWidth="1.6" fill="none">
          {Array.from({ length: 4 }).map((_, i) => (
            <path
              key={i}
              d={`M ${cx - rx} ${top + 18 + i * (height / 4.6)} q ${rx / 2} 10 ${rx} 0 t ${rx} 0`}
            />
          ))}
        </g>
      )}

      {/* Dessus */}
      {square ? (
        <rect x={cx - rx} y={top - ry * 0.5} width={rx * 2} height={ry} fill={`url(#${uid}-top)`} />
      ) : (
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={`url(#${uid}-top)`} />
      )}

      {/* Dorure : filet bronze sur l'arête supérieure */}
      {has('dorure') && (
        <ellipse cx={cx} cy={top} rx={rx - 2} ry={ry - 1.5} fill="none" stroke="#A7793D" strokeWidth="1.6" opacity="0.85" />
      )}

      {/* Ruban : bande secondaire en pied */}
      {has('ruban') && (
        <path
          d={`M ${cx - rx} ${bottom - 22} V ${bottom - 6} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom - 6} V ${bottom - 22} A ${rx} ${ry} 0 0 1 ${cx - rx} ${bottom - 22} Z`}
          fill={secondary}
          opacity="0.95"
        />
      )}

      {/* Perles : rangée à la base */}
      {has('perles') && (
        <g fill={secondary} stroke="#00000033" strokeWidth="0.6">
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={i} cx={cx - rx + 10 + i * ((rx * 2 - 20) / 10)} cy={bottom - 2} r="4" />
          ))}
        </g>
      )}

      {/* Fleurs : cluster discret sur le dessus */}
      {has('fleurs') && (
        <g>
          {[
            [cx - rx * 0.45, top - ry * 0.4, 9],
            [cx - rx * 0.2, top - ry * 0.75, 7],
            [cx + rx * 0.4, top - ry * 0.3, 8],
          ].map(([x, y, r], i) => (
            <g key={i}>
              {Array.from({ length: 5 }).map((_, p) => (
                <ellipse
                  key={p}
                  cx={x}
                  cy={y}
                  rx={r}
                  ry={r / 2.4}
                  fill={secondary}
                  opacity="0.9"
                  transform={`rotate(${(p * 180) / 5} ${x} ${y})`}
                />
              ))}
              <circle cx={x} cy={y} r={r / 3} fill="#A7793D" opacity="0.8" />
            </g>
          ))}
        </g>
      )}

      {/* Fruits : quelques touches sur le dessus */}
      {has('fruits') && (
        <g>
          {[
            [cx - rx * 0.35, top - ry * 0.5],
            [cx + 6, top - ry * 0.8],
            [cx + rx * 0.42, top - ry * 0.35],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="6" fill="#8E2438" opacity="0.92" />
          ))}
        </g>
      )}

      {/* Cœur : emblème discret en face avant */}
      {shape === 'coeur' && (
        <path
          d={`M ${cx} ${top + height * 0.52} c -14 -16 -34 -8 -34 8 c 0 14 20 24 34 34 c 14 -10 34 -20 34 -34 c 0 -16 -20 -24 -34 -8 z`}
          fill="none"
          stroke="#A7793D"
          strokeWidth="1.4"
          opacity="0.8"
        />
      )}

      {/* Chiffre : glyphe serif bronze en face avant */}
      {shape === 'chiffre' && (
        <text
          x={cx}
          y={top + height * 0.68}
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontSize={height * 0.62}
          fill="#A7793D"
          opacity="0.85"
        >
          8
        </text>
      )}
    </g>
  );
}
