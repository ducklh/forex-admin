export interface ICryptoPro {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCryptoPro = Omit<ICryptoPro, 'id'> & { id: null };
