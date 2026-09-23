import Icon, { type IconName } from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

const ITEMS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'pen', title: 'Personnalisation', text: 'Créations sur mesure' },
  { icon: 'leaf', title: 'Ingrédients', text: 'Sélection exigeante' },
  { icon: 'whisk', title: 'Fabrication', text: 'Artisanale' },
  { icon: 'truck', title: 'Commande', text: 'Retrait ou livraison' },
];

/** Bande de réassurance : quatre filets, aucun cadre. */
export default function Reassurance() {
  return (
    <section aria-label="Nos engagements" className="border-y border-ivoire/[0.08] bg-noir">
      <div className="mx-auto grid max-w-[1720px] grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.08}
            className="border-b border-ivoire/[0.08] px-6 py-10 md:px-10 md:py-12 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="flex items-start gap-5">
              <Icon name={item.icon} size={20} strokeWidth={0.9} className="mt-0.5 shrink-0 text-bronze" />
              <div>
                <p className="label !text-[9.5px] !text-ivoire/85">{item.title}</p>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-gris">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
