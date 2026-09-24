/**
 * Livraison & retrait — données locales de démonstration.
 * Toutes les règles de disponibilité sont centralisées ici :
 * le composant calendrier ne contient aucune date en dur.
 * Phase 5 : remplacement par le calendrier réel Supabase
 * (jours fermés, jours complets, capacité maximale, délai minimum).
 */

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

/** Règles de disponibilité de l'atelier (mock propre et centralisé). */
export const AVAILABILITY_RULES = {
  /** Jours fermés (0 = dimanche … 6 = samedi) */
  closedWeekdays: [1],
  /** Délai minimum de fabrication, en jours */
  minLeadDays: 2,
  /** Horizon de réservation, en jours */
  horizonDays: 21,
  /** Dates exceptionnellement complètes */
  fullDates: ['2026-10-05', '2026-10-12', '2026-10-19', '2026-09-28'],
  /** Capacité maximale par date (démo : non saturée sauf fullDates) */
  capacityPerDay: 8,
} as const;

/**
 * Résolution de zone à partir d'un code postal.
 * Phase 5 : appel Supabase (table zones_livraison).
 */
export function resolveZone(postalCode: string) {
  const clean = postalCode.trim();
  return DELIVERY_ZONES.find((z) => z.postalPrefixes.some((p) => clean.startsWith(p))) ?? null;
}

/** Dates ouvertes à la commande, calculées depuis les règles ci-dessus. */
export function getAvailableDates(from = new Date()): string[] {
  const full = new Set<string>(AVAILABILITY_RULES.fullDates);
  const dates: string[] = [];
  for (let i = AVAILABILITY_RULES.minLeadDays; i <= AVAILABILITY_RULES.horizonDays; i += 1) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    if ((AVAILABILITY_RULES.closedWeekdays as readonly number[]).includes(d.getDay())) continue;
    const iso = d.toISOString().slice(0, 10);
    if (full.has(iso)) continue;
    dates.push(iso);
  }
  return dates;
}

export function isDateAvailable(iso: string, available: Set<string>): boolean {
  return available.has(iso);
}
