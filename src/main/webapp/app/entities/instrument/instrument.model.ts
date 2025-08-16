import { IBroker } from 'app/entities/broker/broker.model';

export interface IInstrument {
  id: string;
  name?: string | null;
  broker?: IBroker | null;
}

export type NewInstrument = Omit<IInstrument, 'id'> & { id: null };
