import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Écrire à la maison H-EKAM OAT : projet sur mesure, événement, presse.',
};

export default function ContactPage() {
  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[900px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
        <div className="mb-6 flex items-center gap-4">
          <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
          <p className="label-bronze">Contact</p>
        </div>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-light leading-[1.02] text-ivoire">Parlons de votre projet</h1>
        <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-ivoire/55">
          Une idée précise, un événement à planifier ? Écrivez-nous : l’atelier répond sous 24 h
          ouvrées. (Formulaire de démonstration — l’envoi réel sera connecté en phase 5.)
        </p>

        <ContactForm />
        <div className="mt-16 border-t border-ivoire/10 pt-8 text-[14px] leading-relaxed text-ivoire/55">
          <p>12 rue des Artisans, 75011 Paris</p>
          <p>Du mardi au samedi, 10h – 19h</p>
          <p className="mt-2 text-bronze-clair">bonjour@h-ekam-oat.fr</p>
        </div>
      </div>
    </div>
  );
}
