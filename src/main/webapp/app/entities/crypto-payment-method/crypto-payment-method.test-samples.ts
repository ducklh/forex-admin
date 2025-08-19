import { ICryptoPaymentMethod, NewCryptoPaymentMethod } from './crypto-payment-method.model';

export const sampleWithRequiredData: ICryptoPaymentMethod = {
  id: '8cef93b4-d0eb-4a39-aaad-50ae53c199fa',
  value: 'ick',
};

export const sampleWithPartialData: ICryptoPaymentMethod = {
  id: 'c630ff13-347a-44a2-94c9-061d98adbfa5',
  value: 'but proceed reopen',
  valueEn: 'cool boohoo earth',
};

export const sampleWithFullData: ICryptoPaymentMethod = {
  id: '0d2508a2-3d9f-44e6-9070-e3a485656427',
  value: 'even loftily disapprove',
  valueEn: 'before',
};

export const sampleWithNewData: NewCryptoPaymentMethod = {
  value: 'because',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
