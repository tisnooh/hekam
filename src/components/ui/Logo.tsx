import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'header' | 'full' | 'monogram';
  className?: string;
  /** Taille du monogramme en px (variant header) */
  size?: number;
}

/**
 * Logo officiel de la maison (fichier fourni, fond retiré).
 * Aucun monogramme alternatif n'est créé : on utilise exclusivement
 * les déclinaisons exportées depuis le logo original.
 */
export default function Logo({ variant = 'header', className, size = 34 }: LogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src="/images/brand/logo-full.png"
        alt="H-EKAM OAT — Boulangerie Pâtisserie"
        width={1031}
        height={897}
        className={cn('h-auto w-full', className)}
        priority={false}
      />
    );
  }

  if (variant === 'monogram') {
    return (
      <Image
        src="/images/brand/logo-monogram.png"
        alt="Monogramme H-EKAM OAT"
        width={489}
        height={413}
        className={cn('h-auto w-full', className)}
      />
    );
  }

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/brand/logo-monogram.png"
        alt=""
        width={489}
        height={413}
        style={{ width: size, height: (size * 413) / 489 }}
        className="shrink-0"
      />
      <span className="font-serif text-[15px] uppercase tracking-[0.48em] text-ivoire">
        H-EKAM&nbsp;OAT
      </span>
    </span>
  );
}
