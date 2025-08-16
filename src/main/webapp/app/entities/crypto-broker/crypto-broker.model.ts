export interface ICryptoBroker {
  id: string;
  name?: string | null;
  logo?: string | null;
  url?: string | null;
  description?: string | null;
  rating?: number | null;
  features?: string | null;
  regulation?: string | null;
  minDeposit?: string | null;
  tradingFees?: string | null;
  supportedCoins?: string | null;
  pros?: string | null;
  cons?: string | null;
  founded?: string | null;
  headquarters?: string | null;
  tradingVolume?: string | null;
  securityFeatures?: string | null;
  paymentMethods?: string | null;
  customerSupport?: string | null;
  mobileApp?: boolean | null;
  apiSupport?: boolean | null;
  detailedDescription?: string | null;
}

export type NewCryptoBroker = Omit<ICryptoBroker, 'id'> & { id: null };
