export interface ICoin {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCoin = Omit<ICoin, 'id'> & { id: null };
