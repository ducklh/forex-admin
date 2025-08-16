import { IBroker } from 'app/entities/broker/broker.model';

export interface ILanguage {
  id: string;
  code?: string | null;
  name?: string | null;
  broker?: IBroker | null;
}

export type NewLanguage = Omit<ILanguage, 'id'> & { id: null };
