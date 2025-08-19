export interface ICryptoCon {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCryptoCon = Omit<ICryptoCon, 'id'> & { id: null };
