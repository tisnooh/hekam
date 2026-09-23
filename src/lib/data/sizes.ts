import type { SizeOption } from '@/lib/types';

/** Formats proposés — volontairement peu nombreux, parfaitement maîtrisés. */
export const SIZES: SizeOption[] = [
  { id: 'p4', label: '4 personnes', diameter: 'Ø 14 cm', tiers: '1 étage' },
  { id: 'p6-8', label: '6–8 personnes', diameter: 'Ø 18 cm', tiers: '1 étage' },
  { id: 'p10-12', label: '10–12 personnes', diameter: 'Ø 22 cm', tiers: '1 étage' },
  { id: 'p15-20', label: '15–20 personnes', diameter: 'Ø 26 cm', tiers: '2 étages' },
  { id: 'p25', label: '25+ personnes', diameter: 'Ø 30 cm', tiers: '2 étages' },
];
