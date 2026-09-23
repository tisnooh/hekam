/** Livraison & retrait — données locales de démonstration. */

export const DELIVERY_SLOTS = ['10h – 12h', '12h – 14h', '14h – 16h', '16h – 18h'];

export const DELIVERY_ZONES = [
  { id: 'paris', label: 'Paris intramuros', fee: 15, postalPrefixes: ['75'] },
  { id: 'couronne', label: 'Petite couronne', fee: 25, postalPrefixes: ['92', '93', '94'] },
] as const;

export const PICKUP_POINT = {
  label: 'Retrait en boutique',
  address: '12 rue des Artisans, 75011 Paris',
  hours: 'Du mardi au samedi, 10h – 19h',
};

/**
 * Résolution de zone à partir d'un code postal.
 * Phase 5 : remplacée par un appel Supabase (table zones_livraison).
 */
export function resolveZone(postalCode: string) {
  const clean = postalCode.trim();
  return DELIVERY_ZONES.find((z) => z.postalPrefixes.some((p) => clean.startsWith(p))) ?? null;
}

/**
 * Dates ouvertes à la commande : J+2 → J+21, atelier fermé le lundi
 * et quelques dates complètes (démo déterministe).
 * Phase 5 : remplacé par le calendrier réel (capacité atelier).
 */
export function getAvailableDates(from = new Date()): string[] {
  const closed = new Set(['2026-10-05', '2026-10-12', '2026-10-19', '2026-09-28']);
  const dates: string[] = [];
  const day = new Date(from);
  for (let i = 2; i <= 21; i += 1) {
    const d = new Date(from);
    d.setDate(day.getDate() + i);
    if (d.getDay() === 1) continue; // lundi : atelier fermé
    const iso = d.toISOString().slice(0, 10);
    if (closed.has(iso)) continue;
    dates.push(iso);
  }
  return dates;
}
