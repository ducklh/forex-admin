export interface ICon {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCon = Omit<ICon, 'id'> & { id: null };
