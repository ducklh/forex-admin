export interface ISupport {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewSupport = Omit<ISupport, 'id'> & { id: null };
