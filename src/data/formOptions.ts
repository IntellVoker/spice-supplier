export interface ProductOption {
  id: string;
  isOther?: boolean;
}

export interface IncotermOption {
  id: string;
  recommended?: boolean;
}

export const productOptions: ProductOption[] = [
  { id: 'turmeric' },
  { id: 'ginger' },
  { id: 'cinnamon' },
  { id: 'nutmeg' },
  { id: 'clove' },
  { id: 'moringa' },
  { id: 'other', isOther: true },
];

export const otherProductId = 'other';

export const incotermOptions: IncotermOption[] = [
  { id: 'fob', recommended: true },
  { id: 'cfr' },
  { id: 'cif' },
];

export const defaultIncoterm = 'fob';
