export interface IFeature {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewFeature = Omit<IFeature, 'id'> & { id: null };
