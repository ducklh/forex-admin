export interface ISecurityFeature {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewSecurityFeature = Omit<ISecurityFeature, 'id'> & { id: null };
