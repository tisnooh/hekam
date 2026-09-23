import type { FlavourOption } from '@/lib/types';

export type FlavourCategoryId = 'biscuit' | 'creme' | 'insert';

export interface FlavourCategory {
  id: FlavourCategoryId;
  label: string;
  options: FlavourOption[];
}
