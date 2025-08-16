import { IBroker } from 'app/entities/broker/broker.model';

export interface ISupport {
  id: string;
  type?: string | null;
  broker?: IBroker | null;
}

export type NewSupport = Omit<ISupport, 'id'> & { id: null };
