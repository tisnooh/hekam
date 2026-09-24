'use client';

import { useMemo } from 'react';
import type { CakeConfiguration } from '@/lib/types';
import { paletteHex } from '@/lib/data/decorations';
import { cn } from '@/lib/utils';

interface DemoCakeVisualProps {
  configuration: CakeConfiguration;
  rotation?: number;
  className?: string;
  idPrefix?: string;
}

/**
 * Aperçu 2D paramétrique (miniatures panier / récapitulatif, repli sans WebGL).
 * Reflète honnêtement forme, étages, teintes, finition, options et message.
 * Ce n'est PAS un rendu 3D temps réel : le configurateur utilise
 * CakeStudioViewer (R3F) et l'indique dans l'interface.
 */
export default function DemoCakeVisual({
  configuration,
  rotation = 0,
  className,
  idPrefix = 'cake',
}: DemoCakeVisualProps) {
  const shape = configuration.shape ?? 'rond';
  const { decoration, message } = configuration;
  const main = paletteHex(decoration.mainColor);
  const secondary = paletteHex(decoration.secondaryColor);
  const tiers = shape === 'deux-etages' ? 2 : 1;
  const uid = `${idPrefix}-${shape}`;

  const shade = useMemo(() => {
    const n = parseInt(main.slice(1), 16);
    const f = (v: number) => Math.max(0, Math.round(v * 0.82));
    return `rgb(${f((n >> 16) & 255)} ${f((n >> 8) & 255)} ${f(n & 255)})`;
  }, [main]);

  const has = (opt: string) => decoration.options.includes(opt as never);

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn('block h-full w-full', className)}
      role="img"
      aria-label={`Aperçu de la création : forme ${shape}, teinte ${decoration.mainColor ?? 'ivoire'}, style ${decoration.style ?? 'à définir'}`}
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
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor={main} />
        </radialGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>

      <ellipse cx="200" cy="330" rx="150" ry="16" fill="#000" opacity="0.55" />
      <ellipse cx="200" cy="326" rx="132" ry="13" fill="#141210" />
      <ellipse cx="200" cy="323" rx="132" ry="12" fill="#1E1A16" />

      {tiers === 2 ? (
        <g>
          <TierShape shape={shape} uid={uid} top={210} height={112} rx={118} secondary={secondary} finish={decoration.finish} has={has} />
          <TierShape shape={shape} uid={uid} top={128} height={86} rx={78} secondary={secondary} finish={decoration.finish} has={has} />
        </g>
      ) : (
        <TierShape shape={shape} uid={uid} top={170} height={152} rx={112} secondary={secondary} finish={decoration.finish} has={has} />
      )}

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
  finish,
  has,
}: {
  shape: string;
  uid: string;
  top: number;
  height: number;
  rx: number;
  secondary: string;
  finish: string | null;
  has: (opt: string) => boolean;
}) {
  const cx = 200;
  const ry = rx * 0.26;
  const bottom = top + height;
  const square = shape === 'carre';
  const velours = finish === 'velours';

  const body = square ? (
    <rect x={cx - rx} y={top} width={rx * 2} height={height} fill={`url(#${uid}-side)`} />
  ) : (
    <path d={`M ${cx - rx} ${top} V ${bottom} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} V ${top} Z`} fill={`url(#${uid}-side)`} />
  );

  return (
    <g filter={velours ? `url(#${uid}-grain)` : undefined}>
      {body}
      {square ? (
        <rect x={cx - rx} y={top - ry * 0.5} width={rx * 2} height={ry} fill={`url(#${uid}-top)`} />
      ) : (
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={`url(#${uid}-top)`} />
      )}

      {has('dorure') && (
        <ellipse cx={cx} cy={top} rx={rx - 2} ry={ry - 1.5} fill="none" stroke="#A7793D" strokeWidth="1.6" opacity="0.85" />
      )}

      {has('ruban') && (
        <path
          d={`M ${cx - rx} ${bottom - 22} V ${bottom - 6} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom - 6} V ${bottom - 22} A ${rx} ${ry} 0 0 1 ${cx - rx} ${bottom - 22} Z`}
          fill={secondary}
          opacity="0.95"
        />
      )}

      {has('perles') && (
        <g fill={secondary} stroke="#00000033" strokeWidth="0.6">
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={i} cx={cx - rx + 10 + i * ((rx * 2 - 20) / 10)} cy={bottom - 2} r="4" />
          ))}
        </g>
      )}

      {has('fleurs') && (
        <g>
          {[
            [cx - rx * 0.45, top - ry * 0.4, 9],
            [cx - rx * 0.2, top - ry * 0.75, 7],
            [cx + rx * 0.4, top - ry * 0.3, 8],
          ].map(([x, y, r], i) => (
            <g key={i}>
              {Array.from({ length: 5 }).map((_, p) => (
                <ellipse key={p} cx={x} cy={y} rx={r} ry={r / 2.4} fill={secondary} opacity="0.9" transform={`rotate(${(p * 180) / 5} ${x} ${y})`} />
              ))}
              <circle cx={x} cy={y} r={r / 3} fill="#A7793D" opacity="0.8" />
            </g>
          ))}
        </g>
      )}

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

      {shape === 'coeur' && (
        <path
          d={`M ${cx} ${top + height * 0.52} c -14 -16 -34 -8 -34 8 c 0 14 20 24 34 34 c 14 -10 34 -20 34 -34 c 0 -16 -20 -24 -34 -8 z`}
          fill="none"
          stroke="#A7793D"
          strokeWidth="1.4"
          opacity="0.8"
        />
      )}

      {shape === 'chiffre' && (
        <text x={cx} y={top + height * 0.68} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={height * 0.62} fill="#A7793D" opacity="0.85">
          8
        </text>
      )}
    </g>
  );
}
