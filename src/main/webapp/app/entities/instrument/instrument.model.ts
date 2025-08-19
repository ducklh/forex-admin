export interface IInstrument {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewInstrument = Omit<IInstrument, 'id'> & { id: null };
