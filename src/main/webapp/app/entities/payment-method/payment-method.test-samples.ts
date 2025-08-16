import { IPaymentMethod, NewPaymentMethod } from './payment-method.model';

export const sampleWithRequiredData: IPaymentMethod = {
  id: 'a16281ea-5552-4063-90ba-85fe00ef3eb6',
  name: 'because gray since',
};

export const sampleWithPartialData: IPaymentMethod = {
  id: 'f5bd6814-b44f-414d-8ba7-34fb3a539e3f',
  name: 'ack calmly',
};

export const sampleWithFullData: IPaymentMethod = {
  id: '2d61c53a-7294-45f9-9e08-bd677638df7f',
  name: 'worriedly underneath',
};

export const sampleWithNewData: NewPaymentMethod = {
  name: 'uh-huh well-made unlike',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
