import { PRICING } from '@/lib/data/pricing';
import { DECORATION_STYLES } from '@/lib/data/decorations';
import { SIZES } from '@/lib/data/sizes';
import { isPremiumFlavour, flavourName } from '@/lib/data/flavours';
import { DELIVERY_ZONES, resolveZone } from '@/lib/data/delivery';
import type { CakeConfiguration, PriceBreakdown } from '@/lib/types';

/**
 * UNIQUE fonction de calcul de prix du site.
 * Aucun composant ne calcule de montant : tous affichent ce résultat.
 *
 * total = base(format) + forme + saveurs premium + style décor
 *         + finition + texture + options + livraison
 */
export function calculateCakePrice(config: CakeConfiguration): PriceBreakdown {
  const lines: PriceBreakdown['lines'] = [];

  const size = SIZES.find((s) => s.id === config.size) ?? SIZES[1];
  lines.push({ id: 'base', label: `Format · ${size.label}`, amount: PRICING.sizeBase[config.size] });

  const shapeAmount = PRICING.shape[config.shape];
  if (shapeAmount > 0) lines.push({ id: 'shape', label: `Forme · ${config.shape}`, amount: shapeAmount });

  (Object.keys(config.flavours) as Array<keyof typeof config.flavours>).forEach((cat) => {
    const id = config.flavours[cat];
    if (isPremiumFlavour(cat, id)) {
      lines.push({
        id: `premium-${cat}`,
        label: `Saveur premium · ${flavourName(cat, id)}`,
        amount: PRICING.premiumFlavour,
      });
    }
  });

  const styleAmount = PRICING.decorationStyle[config.decoration.style];
  if (styleAmount > 0) {
    const style = DECORATION_STYLES.find((s) => s.id === config.decoration.style);
    lines.push({ id: 'style', label: `Décoration · ${style?.label ?? config.decoration.style}`, amount: styleAmount });
  }

  const finishAmount = PRICING.finish[config.decoration.finish];
  if (finishAmount > 0) lines.push({ id: 'finish', label: 'Finition velours', amount: finishAmount });

  const textureAmount = PRICING.texture[config.decoration.texture];
  if (textureAmount > 0) lines.push({ id: 'texture', label: `Texture · ${config.decoration.texture}`, amount: textureAmount });

  config.decoration.options.forEach((opt) => {
    lines.push({ id: `opt-${opt}`, label: `Option · ${opt}`, amount: PRICING.option[opt] });
  });

  if (config.delivery.mode === 'livraison' && config.delivery.address?.postalCode) {
    const zone = resolveZone(config.delivery.address.postalCode);
    if (zone) {
      lines.push({ id: 'delivery', label: `Livraison · ${zone.label}`, amount: zone.fee });
    }
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total };
}

/** Frais de livraison d'une zone (pour affichage hors configurateur). */
export function deliveryFee(postalCode: string | null | undefined): number {
  if (!postalCode) return 0;
  const zone = DELIVERY_ZONES.find((z) => z.postalPrefixes.some((p) => postalCode.startsWith(p)));
  return zone?.fee ?? 0;
}
