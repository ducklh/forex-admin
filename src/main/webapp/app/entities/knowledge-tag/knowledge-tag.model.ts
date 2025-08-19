export interface IKnowledgeTag {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewKnowledgeTag = Omit<IKnowledgeTag, 'id'> & { id: null };
