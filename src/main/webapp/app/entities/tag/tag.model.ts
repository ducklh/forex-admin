export interface ITag {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewTag = Omit<ITag, 'id'> & { id: null };
