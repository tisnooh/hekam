'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIGURATOR_STEPS, useConfigurator } from '@/context/ConfiguratorContext';
import StepProgress from '@/components/configurator/StepProgress';
import ConfiguratorSummary from '@/components/configurator/ConfiguratorSummary';
import CakeViewer360 from '@/components/cake/CakeViewer360';
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
  { title: 'Pour quel moment ?', desc: 'Chaque création commence par une occasion.' },
  { title: 'Combien de convives ?', desc: 'Le format détermine le diamètre et les étages.' },
  { title: 'Quelle silhouette ?', desc: 'Cinq formes, chacune parfaitement maîtrisée.' },
  { title: 'Choisissez vos saveurs', desc: 'Sélectionnez les saveurs de votre gâteau.' },
  { title: 'Votre décoration', desc: 'Style, teintes, texture et finitions.' },
  { title: 'Votre message', desc: 'Quelques mots, posés à la main.' },
  { title: 'Retrait ou livraison', desc: 'Choisissez votre date et votre créneau.' },
];

const STEPS = [StepOccasion, StepPersonnes, StepForme, StepSaveurs, StepDecoration, StepMessage, StepLivraison];

/**
 * Studio de création :
 * desktop = progression discrète / gâteau dominant + options / récapitulatif ;
 * mobile = interface dédiée (progression fine, gâteau, options, barre sticky).
 */
export default function ConfiguratorLayout() {
  const { step, next, back, isLastStep, addToCart, price, editingId, config } = useConfigurator();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const StepComponent = STEPS[step];
  const meta = STEP_META[step];

  const primaryAction = () => {
    if (isLastStep) addToCart();
    else next();
  };

  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1800px] px-6 pb-36 pt-24 md:px-10 md:pt-32 lg:pb-20">
        <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)_340px] lg:gap-14 xl:grid-cols-[200px_minmax(0,1fr)_370px] xl:gap-20">
          {/* Progression (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="label mb-7 !text-[9px] text-ivoire/30">Création</p>
              <StepProgress />
            </div>
          </div>

          {/* Visualisation + options */}
          <div className="min-w-0">
            {/* Barre mobile : retour, étape, aperçu */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
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
                Aperçu
              </button>
            </div>

            {/* Progression mobile : sept filets */}
            <div className="mb-8 flex gap-1.5 lg:hidden" aria-hidden="true">
              {CONFIGURATOR_STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={cn(
                    'h-px flex-1 transition-colors duration-700',
                    i === step ? 'bg-bronze' : i < step ? 'bg-bronze/45' : 'bg-ivoire/12',
                  )}
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
                <header className="mb-10 hidden lg:block">
                  <p className="label mb-5 !text-[9.5px] text-bronze">
                    Étape {String(step + 1).padStart(2, '0')} / 07 — {CONFIGURATOR_STEPS[step].label}
                  </p>
                  <h1 className="font-serif text-[clamp(32px,3.2vw,46px)] font-light leading-[1.05] text-ivoire">
                    {meta.title}
                  </h1>
                  <p className="mt-4 text-[13.5px] text-ivoire/45">{meta.desc}</p>
                </header>
                <header className="mb-8 lg:hidden">
                  <h1 className="font-serif text-[30px] font-light leading-tight text-ivoire">{meta.title}</h1>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ivoire/45">{meta.desc}</p>
                </header>

                {/* Le gâteau, élément principal */}
                <div className="relative mb-12 h-[250px] xs:h-[290px] md:h-[400px] lg:mb-14 lg:h-[460px] xl:h-[540px]">
                  <CakeViewer360 configuration={config} idPrefix="main" />
                </div>

                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation desktop */}
            <div className="mt-16 hidden items-center justify-between border-t border-ivoire/[0.09] pt-9 lg:flex">
              <button type="button" onClick={back} disabled={step === 0} className="btn-ghost !px-7 !py-3.5 disabled:opacity-25">
                <Icon name="arrowLeft" size={14} />
                Retour
              </button>
              <button type="button" onClick={primaryAction} className="btn-primary !px-9 !py-4">
                {isLastStep ? (editingId ? 'Mettre à jour' : 'Ajouter au panier') : 'Continuer'}
                {!isLastStep && <Icon name="arrowRight" size={14} />}
                {isLastStep && (
                  <span className="ml-3 font-sans text-[10px] tracking-[0.12em] opacity-70">{formatPrice(price.total)}</span>
                )}
              </button>
            </div>
          </div>

          {/* Récapitulatif (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 border-l border-ivoire/[0.08] pl-12">
              <ConfiguratorSummary />
            </div>
          </div>
        </div>
      </div>

      {/* Barre sticky mobile : prix + action */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivoire/[0.09] bg-noir/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-5 px-6 py-4">
          <div className="shrink-0">
            <p className="label !text-[8.5px] text-ivoire/40">Total</p>
            <AnimatedPrice value={price.total} className="font-serif text-[24px] font-light leading-tight text-bronze-clair" />
          </div>
          <button type="button" onClick={primaryAction} className="btn-primary min-h-[52px] flex-1 !py-0">
            {isLastStep ? (editingId ? 'Mettre à jour' : 'Ajouter') : 'Continuer'} — {formatPrice(price.total)}
          </button>
        </div>
      </div>

      {/* Récapitulatif mobile (bottom sheet) */}
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
              className="fixed inset-0 z-[75] bg-noir/70 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[78] max-h-[82vh] overflow-y-auto border-t border-ivoire/12 bg-noir-soft px-6 pb-[calc(24px+env(safe-area-inset-bottom))] pt-4 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Récapitulatif de la création"
            >
              <div className="mx-auto mb-6 h-px w-9 bg-ivoire/20" aria-hidden="true" />
              <ConfiguratorSummary />
              <button type="button" onClick={() => setSummaryOpen(false)} className="btn-ghost mt-9 w-full">
                Fermer
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
