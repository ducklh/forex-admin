export interface IPlatform {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewPlatform = Omit<IPlatform, 'id'> & { id: null };
