export interface IPaymentMethod {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewPaymentMethod = Omit<IPaymentMethod, 'id'> & { id: null };
