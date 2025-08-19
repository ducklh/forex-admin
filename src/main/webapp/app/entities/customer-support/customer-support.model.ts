export interface ICustomerSupport {
  id: string;
  value?: string | null;
  valueEn?: string | null;
}

export type NewCustomerSupport = Omit<ICustomerSupport, 'id'> & { id: null };
