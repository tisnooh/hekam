import { PRICING } from '@/lib/data/pricing';
import { DECORATION_STYLES, paletteLabel } from '@/lib/data/decorations';
import { SIZES } from '@/lib/data/sizes';
import { isPremiumFlavour, flavourName } from '@/lib/data/flavours';
import { resolveZone } from '@/lib/data/delivery';
import type { CakeConfiguration, FlavourCategoryId, PriceBreakdown } from '@/lib/types';

/**
 * UNIQUE fonction de calcul de prix du site — déterministe.
 *
 * total = base(format) + forme + saveurs premium + style décor
 *         + finition + options + livraison
 *
 * `ready` est false tant que le format n'est pas choisi : aucun prix
 * n'est affiché avant le minimum nécessaire.
 */
export function calculateCakePrice(config: CakeConfiguration): PriceBreakdown {
  if (!config.size) return { ready: false, lines: [], total: 0 };

  const lines: PriceBreakdown['lines'] = [];

  const size = SIZES.find((s) => s.id === config.size);
  lines.push({ id: 'base', label: `Base ${size?.label ?? ''}`.trim(), amount: PRICING.sizeBase[config.size] });

  const shapeAmount = config.shape ? PRICING.shape[config.shape] : 0;
  if (shapeAmount > 0 && config.shape) {
    const shapeLabels: Record<string, string> = {
      carre: 'Carré',
      coeur: 'Cœur',
      chiffre: 'Chiffre',
      'deux-etages': 'Deux étages',
    };
    lines.push({ id: 'shape', label: `Forme ${shapeLabels[config.shape]}`, amount: shapeAmount });
  }

  (Object.keys(config.flavours) as FlavourCategoryId[]).forEach((cat) => {
    const id = config.flavours[cat];
    if (isPremiumFlavour(cat, id)) {
      lines.push({ id: `premium-${cat}`, label: flavourName(cat, id) ?? 'Saveur premium', amount: PRICING.premiumFlavour });
    }
  });

  if (config.decoration.style) {
    const styleAmount = PRICING.decorationStyle[config.decoration.style];
    if (styleAmount > 0) {
      const style = DECORATION_STYLES.find((s) => s.id === config.decoration.style);
      lines.push({ id: 'style', label: `Décoration ${style?.label.toLowerCase() ?? ''}`, amount: styleAmount });
    }
  }

  if (config.decoration.finish) {
    const finishAmount = PRICING.finish[config.decoration.finish];
    if (finishAmount > 0) lines.push({ id: 'finish', label: 'Finition velours', amount: finishAmount });
  }

  config.decoration.options.forEach((opt) => {
    const labels: Record<string, string> = {
      fleurs: 'Fleurs',
      perles: 'Perles',
      fruits: 'Fruits',
      ruban: 'Ruban',
      dorure: 'Dorure',
      topper: 'Topper',
    };
    lines.push({ id: `opt-${opt}`, label: labels[opt] ?? opt, amount: PRICING.option[opt] });
  });

  if (config.delivery.mode === 'livraison' && config.delivery.address?.postalCode) {
    const zone = resolveZone(config.delivery.address.postalCode);
    if (zone) lines.push({ id: 'delivery', label: `Livraison · ${zone.label}`, amount: zone.fee });
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { ready: true, lines, total };
}

/** Libellé de couleur lisible pour le récapitulatif. */
export function colorLabel(id: string | null): string {
  return id ? paletteLabel(id) : '—';
}
