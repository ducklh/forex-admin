export interface ICryptoFeature {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCryptoFeature = Omit<ICryptoFeature, 'id'> & { id: null };
