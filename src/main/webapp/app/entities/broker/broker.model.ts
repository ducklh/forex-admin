export interface IBroker {
  id: string;
  name?: string | null;
  logo?: string | null;
  url?: string | null;
  description?: string | null;
  rating?: number | null;
  minDeposit?: number | null;
  spreads?: string | null;
  leverage?: string | null;
  founded?: number | null;
  headquarters?: string | null;
}

export type NewBroker = Omit<IBroker, 'id'> & { id: null };
