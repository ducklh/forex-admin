export interface ILanguageSupport {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewLanguageSupport = Omit<ILanguageSupport, 'id'> & { id: null };
