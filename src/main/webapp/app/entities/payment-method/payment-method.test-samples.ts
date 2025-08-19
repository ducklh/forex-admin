import { IPaymentMethod, NewPaymentMethod } from './payment-method.model';

export const sampleWithRequiredData: IPaymentMethod = {
  id: 'a16281ea-5552-4063-90ba-85fe00ef3eb6',
  value: 'because gray since',
};

export const sampleWithPartialData: IPaymentMethod = {
  id: '5bd6814b-44f1-44db-aa73-4fb3a539e3f2',
  value: 'lieu',
};

export const sampleWithFullData: IPaymentMethod = {
  id: '2d61c53a-7294-45f9-9e08-bd677638df7f',
  value: 'worriedly underneath',
  valueEn: 'beyond however yeast',
};

export const sampleWithNewData: NewPaymentMethod = {
  value: 'uh-huh well-made unlike',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
