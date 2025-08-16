import { IBroker } from 'app/entities/broker/broker.model';

export interface IPro {
  id: string;
  text?: string | null;
  broker?: IBroker | null;
}

export type NewPro = Omit<IPro, 'id'> & { id: null };
