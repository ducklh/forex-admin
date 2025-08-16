import { IBroker } from 'app/entities/broker/broker.model';

export interface IPlatform {
  id: string;
  name?: string | null;
  broker?: IBroker | null;
}

export type NewPlatform = Omit<IPlatform, 'id'> & { id: null };
