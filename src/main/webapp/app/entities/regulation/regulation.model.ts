import { IBroker } from 'app/entities/broker/broker.model';

export interface IRegulation {
  id: string;
  authority?: string | null;
  broker?: IBroker | null;
}

export type NewRegulation = Omit<IRegulation, 'id'> & { id: null };
