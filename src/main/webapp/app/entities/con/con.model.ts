import { IBroker } from 'app/entities/broker/broker.model';

export interface ICon {
  id: string;
  text?: string | null;
  broker?: IBroker | null;
}

export type NewCon = Omit<ICon, 'id'> & { id: null };
