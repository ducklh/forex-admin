import { IBroker } from 'app/entities/broker/broker.model';

export interface IPaymentMethod {
  id: string;
  name?: string | null;
  broker?: IBroker | null;
}

export type NewPaymentMethod = Omit<IPaymentMethod, 'id'> & { id: null };
