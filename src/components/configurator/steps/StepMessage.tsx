'use client';

import { useConfigurator } from '@/context/ConfiguratorContext';
import { TextOption, StepSubTitle } from '@/components/configurator/ConfiguratorOptions';
import UploadField from '@/components/configurator/UploadField';

const MESSAGE_COLORS = [
  { id: 'bronze', label: 'Bronze' },
  { id: 'ivoire', label: 'Ivoire' },
  { id: 'brun', label: 'Brun' },
];

const MAX_CAKE_TEXT = 25;

/** Étape 6 — lettrage éditorial, topper, fichiers, instructions. */
export default function StepMessage() {
  const { config, update } = useConfigurator();
  const message = config.message;

  const patchMessage = (p: Partial<typeof message>) => update({ message: { ...message, ...p } });

  return (
    <div className="space-y-14">
      <div className="max-w-xl">
        <StepSubTitle hint={`${message.text.length}/${MAX_CAKE_TEXT} caractères`}>Texte sur le gâteau</StepSubTitle>
        <input
          type="text"
          value={message.text}
          maxLength={MAX_CAKE_TEXT}
          onChange={(e) => patchMessage({ text: e.target.value })}
          placeholder="Joyeux anniversaire Emma"
          aria-label="Texte placé sur le gâteau (25 caractères maximum)"
          className="w-full border-b border-ivoire/20 bg-transparent pb-4 font-serif text-[28px] font-light italic leading-tight text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none md:text-[32px]"
        />
        <p className="mt-4 max-w-[46ch] text-[11.5px] leading-relaxed text-ivoire/35">
          Au-delà de {MAX_CAKE_TEXT} caractères, le lettrage perd sa finesse : nous vous
          contacterons si besoin.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <StepSubTitle>Couleur du lettrage</StepSubTitle>
          <div className="grid grid-cols-3 gap-4">
            {MESSAGE_COLORS.map((c) => (
              <TextOption key={c.id} selected={message.color === c.id} onClick={() => patchMessage({ color: c.id })}>
                {c.label}
              </TextOption>
            ))}
          </div>
        </div>
        <div>
          <StepSubTitle>Topper</StepSubTitle>
          <TextOption selected={message.topper} onClick={() => patchMessage({ topper: !message.topper })} priceLabel="+ 8 €">
            Topper losange bronze
          </TextOption>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <UploadField
          label="Logo (entreprise, événement)"
          hint="PNG ou SVG vectoriel de préférence — démo : fichier local"
          fileName={config.logoName}
          onFile={(name) => update({ logoName: name })}
        />
        <UploadField
          label="Photo d’inspiration"
          hint="Une idée vue ailleurs ? Montrez-la nous — démo : fichier local"
          fileName={config.inspirationName}
          onFile={(name) => update({ inspirationName: name })}
        />
      </div>

      <div className="max-w-xl">
        <StepSubTitle hint="Non affiché sur le gâteau">Instructions pour l’atelier</StepSubTitle>
        <textarea
          value={config.workshopNotes}
          onChange={(e) => update({ workshopNotes: e.target.value })}
          rows={4}
          placeholder="Allergie à préciser, souhait particulier, référence de couleur…"
          aria-label="Instructions pour l’atelier"
          className="w-full resize-none border-b border-ivoire/20 bg-transparent py-3 text-[14px] leading-[1.9] text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none"
        />
      </div>
    </div>
  );
}
