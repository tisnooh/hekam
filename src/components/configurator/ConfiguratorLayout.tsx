'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIGURATOR_STEPS, useConfigurator } from '@/context/ConfiguratorContext';
import StepProgress from '@/components/configurator/StepProgress';
import ConfiguratorSummary from '@/components/configurator/ConfiguratorSummary';
import CakeStudioViewer from '@/components/cake/CakeStudioViewer';
import AnimatedPrice from '@/components/ui/AnimatedPrice';
import Icon from '@/components/ui/Icon';
import StepOccasion from '@/components/configurator/steps/StepOccasion';
import StepPersonnes from '@/components/configurator/steps/StepPersonnes';
import StepForme from '@/components/configurator/steps/StepForme';
import StepSaveurs from '@/components/configurator/steps/StepSaveurs';
import StepDecoration from '@/components/configurator/steps/StepDecoration';
import StepMessage from '@/components/configurator/steps/StepMessage';
import StepLivraison from '@/components/configurator/steps/StepLivraison';
import { formatPrice, cn } from '@/lib/utils';

const STEP_META = [
  { title: 'Pour quel moment ?', desc: 'Choisissez l’occasion pour laquelle nous créerons votre gâteau.' },
  { title: 'Combien de convives ?', desc: 'Le format détermine le diamètre, les étages et le prix de base.' },
  { title: 'Quelle silhouette ?', desc: 'Cinq formes, chacune parfaitement maîtrisée à l’atelier.' },
  { title: 'Composez vos saveurs', desc: 'Biscuit, crème et insert : une sélection par catégorie.' },
  { title: 'Personnalisez le design', desc: 'Style, teintes, finition et options : tout se voit immédiatement.' },
  { title: 'Votre message', desc: 'Quelques mots posés à la main, et ce qu’il faut savoir pour l’atelier.' },
  { title: 'Retrait ou livraison', desc: 'Date, créneau et, si besoin, adresse de livraison.' },
];

const STEPS = [StepOccasion, StepPersonnes, StepForme, StepSaveurs, StepDecoration, StepMessage, StepLivraison];

/**
 * Studio de création H-EKAM OAT.
 * Desktop : progression 15 % / visualisation + options 60 % / récapitulatif 25 %.
 * Tablette : deux zones + récapitulatif en drawer.
 * Mobile : interface dédiée avec barre fixe inférieure.
 */
export default function ConfiguratorLayout() {
  const { step, next, back, isLastStep, addToCart, price, editingId, config, stepComplete, reset } = useConfigurator();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const StepComponent = STEPS[step];
  const meta = STEP_META[step];

  const primaryAction = () => {
    if (!stepComplete) return;
    if (isLastStep) addToCart();
    else next();
  };

  const resetBlock = (
    <div className="mt-10 border-t border-ivoire/[0.08] pt-6">
      {confirmReset ? (
        <div role="alertdialog" aria-label="Confirmation de réinitialisation">
          <p className="text-[12.5px] leading-relaxed text-ivoire/70">
            Voulez-vous vraiment supprimer votre création actuelle ?
          </p>
          <div className="mt-4 flex gap-6">
            <button
              type="button"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
              className="label !text-[9px] text-bronze-clair underline underline-offset-4"
            >
              Supprimer
            </button>
            <button type="button" onClick={() => setConfirmReset(false)} className="label !text-[9px] text-ivoire/45 hover:text-ivoire">
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirmReset(true)} className="label !text-[9px] text-ivoire/35 hover:text-ivoire/70">
          Recommencer
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1800px] px-6 pb-32 pt-24 md:px-10 md:pt-32 xl:pb-28">
        <div className="lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)_360px] xl:gap-16">
          {/* COLONNE GAUCHE — progression */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="label mb-7 !text-[9px] text-ivoire/30">Création</p>
              <StepProgress />
              {resetBlock}
            </div>
          </div>

          {/* ZONE CENTRALE — visualisation + options */}
          <div className="min-w-0">
            {/* Barre mobile / tablette */}
            <div className="mb-6 flex items-center justify-between xl:hidden">
              <div className="flex items-center gap-4">
                {step > 0 && (
                  <button type="button" onClick={back} aria-label="Étape précédente" className="p-1 text-ivoire/60">
                    <Icon name="arrowLeft" size={17} />
                  </button>
                )}
                <p className="label !text-[9.5px] text-ivoire/50">
                  Étape {step + 1}/7 — <span className="text-bronze-clair">{CONFIGURATOR_STEPS[step].label}</span>
                </p>
              </div>
              <button type="button" onClick={() => setSummaryOpen(true)} className="label link-underline !text-[9.5px] text-ivoire/60">
                Voir ma création
              </button>
            </div>

            {/* Progression fine mobile */}
            <div className="mb-8 flex gap-1.5 lg:hidden" aria-hidden="true">
              {CONFIGURATOR_STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={cn('h-px flex-1 transition-colors duration-700', i === step ? 'bg-bronze' : i < step ? 'bg-bronze/45' : 'bg-ivoire/12')}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className="mb-8">
                  <p className="label mb-4 hidden !text-[9.5px] text-bronze lg:block">
                    Étape {String(step + 1).padStart(2, '0')} / 07 — {CONFIGURATOR_STEPS[step].label}
                  </p>
                  <h1 className="font-serif text-[clamp(30px,3.2vw,44px)] font-light leading-[1.05] text-ivoire">{meta.title}</h1>
                  <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-ivoire/45">{meta.desc}</p>
                </header>

                {/* Visualisation — le gâteau domine, sans excès de hauteur */}
                <div className="relative mb-10 h-[280px] xs:h-[320px] md:h-[380px] lg:h-[400px] xl:h-[430px]">
                  <CakeStudioViewer configuration={config} />
                </div>

                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* COLONNE DROITE — récapitulatif sticky (desktop large) */}
          <div className="hidden xl:block">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto border-l border-ivoire/[0.08] pl-12 pr-1">
              <ConfiguratorSummary />
            </div>
          </div>
        </div>
      </div>

      {/* BARRE FIXE — prix + navigation, toujours visible */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivoire/[0.09] bg-noir/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-6 py-3.5 md:px-10">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="label hidden !text-[9.5px] text-ivoire/50 transition-colors hover:text-ivoire disabled:opacity-25 sm:block"
          >
            ← Précédent
          </button>
          <button type="button" onClick={back} disabled={step === 0} aria-label="Étape précédente" className="p-1 text-ivoire/60 disabled:opacity-25 sm:hidden">
            <Icon name="arrowLeft" size={17} />
          </button>

          <div className="flex items-baseline gap-3">
            <p className="label !text-[9px] text-ivoire/40">Total</p>
            {price.ready ? (
              <AnimatedPrice value={price.total} className="font-serif text-[22px] font-light leading-none text-bronze-clair" />
            ) : (
              <span className="font-serif text-[15px] font-light italic text-ivoire/35">À déterminer</span>
            )}
          </div>

          <button
            type="button"
            onClick={primaryAction}
            disabled={!stepComplete}
            aria-disabled={!stepComplete}
            title={stepComplete ? undefined : 'Complétez le choix de cette étape pour continuer'}
            className={cn(
              'btn-primary min-h-[48px] flex-1 sm:flex-none !px-8 !py-0',
              !stepComplete && 'cursor-not-allowed opacity-35 hover:!bg-ivoire hover:!text-noir',
            )}
          >
            {isLastStep ? (editingId ? 'Mettre à jour' : 'Ajouter au panier') : 'Continuer →'}
          </button>
        </div>
      </div>

      {/* DRAWER RÉCAPITULATIF (mobile & tablette) */}
      <AnimatePresence>
        {summaryOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le récapitulatif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSummaryOpen(false)}
              className="fixed inset-0 z-[75] bg-noir/70 xl:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[78] max-h-[84vh] overflow-y-auto border-t border-ivoire/12 bg-noir-soft px-6 pb-[calc(28px+env(safe-area-inset-bottom))] pt-4 xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Récapitulatif de la création"
            >
              <div className="mx-auto mb-6 h-px w-9 bg-ivoire/20" aria-hidden="true" />
              <ConfiguratorSummary />
              <div className="lg:hidden">{resetBlock}</div>
              <button type="button" onClick={() => setSummaryOpen(false)} className="btn-ghost mt-8 w-full">
                Fermer
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
