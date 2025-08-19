import { ICryptoFeature } from 'app/entities/crypto-feature/crypto-feature.model';
import { ICoin } from 'app/entities/coin/coin.model';
import { ICryptoPro } from 'app/entities/crypto-pro/crypto-pro.model';
import { ICryptoCon } from 'app/entities/crypto-con/crypto-con.model';
import { ISecurityFeature } from 'app/entities/security-feature/security-feature.model';
import { ICryptoPaymentMethod } from 'app/entities/crypto-payment-method/crypto-payment-method.model';
import { ICustomerSupport } from 'app/entities/customer-support/customer-support.model';

export interface ICryptoBroker {
  id: string;
  name?: string | null;
  nameEn?: string | null;
  logo?: string | null;
  url?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  rating?: number | null;
  regulation?: string | null;
  minDeposit?: string | null;
  tradingFees?: string | null;
  founded?: string | null;
  headquarters?: string | null;
  headquartersEn?: string | null;
  tradingVolume?: string | null;
  mobileApp?: boolean | null;
  apiSupport?: boolean | null;
  detailedDescription?: string | null;
  detailedDescriptionEn?: string | null;
  cryptoFeatures?: ICryptoFeature[] | null;
  supportedCoins?: ICoin[] | null;
  cryptoPros?: ICryptoPro[] | null;
  cryptoCons?: ICryptoCon[] | null;
  securityFeatures?: ISecurityFeature[] | null;
  paymentMethods?: ICryptoPaymentMethod[] | null;
  customerSupports?: ICustomerSupport[] | null;
}

export type NewCryptoBroker = Omit<ICryptoBroker, 'id'> & { id: null };
