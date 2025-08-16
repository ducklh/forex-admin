import { IBroker } from 'app/entities/broker/broker.model';

export interface IFeature {
  id: string;
  name?: string | null;
  broker?: IBroker | null;
}

export type NewFeature = Omit<IFeature, 'id'> & { id: null };
