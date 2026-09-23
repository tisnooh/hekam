import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-noir px-5 text-center">
      <Logo variant="monogram" className="w-16 opacity-80" />
      <p className="label mt-8 text-bronze">Page introuvable</p>
      <h1 className="mt-4 font-serif text-[36px] font-light text-ivoire">Cette page s’est envolée.</h1>
      <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-ivoire/55">
        Le lien est peut-être ancien, ou la création renommée. Reprenons depuis le début.
      </p>
      <Link href="/" className="btn-ghost mt-10">
        Retour à l’accueil
      </Link>
    </div>
  );
}
