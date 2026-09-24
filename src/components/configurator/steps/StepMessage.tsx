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

/** Étape 6 — message, âge, couleur, topper, inspiration, instructions. */
export default function StepMessage() {
  const { config, update } = useConfigurator();
  const message = config.message;

  const patchMessage = (p: Partial<typeof message>) => update({ message: { ...message, ...p } });

  return (
    <div className="space-y-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <StepSubTitle hint={`${message.text.length} / ${MAX_CAKE_TEXT}`}>Prénom / message</StepSubTitle>
          <input
            type="text"
            value={message.text}
            maxLength={MAX_CAKE_TEXT}
            onChange={(e) => patchMessage({ text: e.target.value })}
            placeholder="Joyeux anniversaire Emma"
            aria-label="Texte posé sur le gâteau (25 caractères maximum)"
            className="w-full border-b border-ivoire/20 bg-transparent pb-4 font-serif text-[28px] font-light italic leading-tight text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none md:text-[32px]"
          />
          <p className="mt-3 text-[10.5px] tracking-[0.08em] text-ivoire/30" aria-live="polite">
            {message.text.length} / {MAX_CAKE_TEXT} caractères
          </p>
        </div>
        <div>
          <StepSubTitle hint="Optionnel">Âge fêté</StepSubTitle>
          <input
            type="text"
            inputMode="numeric"
            value={message.age}
            maxLength={3}
            onChange={(e) => patchMessage({ age: e.target.value.replace(/\D/g, '') })}
            placeholder="25"
            aria-label="Âge fêté (optionnel)"
            className="w-24 border-b border-ivoire/20 bg-transparent pb-3 font-serif text-[28px] font-light text-ivoire placeholder:text-ivoire/20 focus:border-bronze focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <fieldset>
          <StepSubTitle>Couleur du message</StepSubTitle>
          <div className="grid grid-cols-3 gap-5" role="radiogroup" aria-label="Couleur du message">
            {MESSAGE_COLORS.map((c) => (
              <TextOption key={c.id} selected={message.color === c.id} onClick={() => patchMessage({ color: c.id })}>
                {c.label}
              </TextOption>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <StepSubTitle>Topper</StepSubTitle>
          <TextOption selected={message.topper} onClick={() => patchMessage({ topper: !message.topper })} priceLabel="+ 8 €">
            Topper losange bronze
          </TextOption>
        </fieldset>
      </div>

      <div className="max-w-xl">
        <UploadField
          label="Photo d’inspiration"
          hint="JPG, PNG ou WEBP — 5 Mo max (démo : fichier local)"
          accept="image/jpeg,image/png,image/webp"
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
