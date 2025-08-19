export interface IPro {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewPro = Omit<IPro, 'id'> & { id: null };
