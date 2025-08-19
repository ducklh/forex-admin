export interface ICryptoPaymentMethod {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCryptoPaymentMethod = Omit<ICryptoPaymentMethod, 'id'> & { id: null };
