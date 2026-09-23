'use client';

import { useCart } from '@/context/CartContext';
import type { CakeConfiguration } from '@/lib/types';

/**
 * Ajout direct au panier depuis une fiche produit
 * (configuration de référence issue du catalogue).
 */
export default function AddToCartButton({
  productSlug,
  productName,
  unitPrice,
  configuration,
}: {
  productSlug: string;
  productName: string;
  unitPrice: number;
  configuration: CakeConfiguration;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: `prod-${productSlug}-${Date.now().toString(36)}`,
          title: productName,
          configuration,
          unitPrice,
          sourceSlug: productSlug,
        })
      }
      className="btn-ghost flex-1"
    >
      Ajouter au panier
    </button>
  );
}
