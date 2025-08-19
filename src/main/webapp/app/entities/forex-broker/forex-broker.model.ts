import { IFeature } from 'app/entities/feature/feature.model';
import { IPlatform } from 'app/entities/platform/platform.model';
import { IInstrument } from 'app/entities/instrument/instrument.model';
import { IPro } from 'app/entities/pro/pro.model';
import { ICon } from 'app/entities/con/con.model';
import { ILanguageSupport } from 'app/entities/language-support/language-support.model';
import { ISupport } from 'app/entities/support/support.model';
import { IPaymentMethod } from 'app/entities/payment-method/payment-method.model';

export interface IForexBroker {
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
  spreads?: string | null;
  leverage?: string | null;
  founded?: string | null;
  headquarters?: string | null;
  headquartersEn?: string | null;
  forexFeatures?: IFeature[] | null;
  forexPlatforms?: IPlatform[] | null;
  forexInstruments?: IInstrument[] | null;
  forexPros?: IPro[] | null;
  forexCons?: ICon[] | null;
  forexLanguages?: ILanguageSupport[] | null;
  forexSupports?: ISupport[] | null;
  forexPaymentMethods?: IPaymentMethod[] | null;
}

export type NewForexBroker = Omit<IForexBroker, 'id'> & { id: null };
