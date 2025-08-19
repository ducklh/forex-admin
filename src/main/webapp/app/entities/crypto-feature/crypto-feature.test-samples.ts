import { ICryptoFeature, NewCryptoFeature } from './crypto-feature.model';

export const sampleWithRequiredData: ICryptoFeature = {
  id: '8a8f5e6d-297b-4c68-aa48-54b603b6faa5',
  value: 'yowza an however',
};

export const sampleWithPartialData: ICryptoFeature = {
  id: 'ca777c7a-7699-4d14-bf27-db5b381a9cc9',
  value: 'incomparable',
  valueEn: 'fake slushy till',
};

export const sampleWithFullData: ICryptoFeature = {
  id: 'b7c8bf70-4d8e-4477-aeba-df15c774621a',
  value: 'dish likewise confound',
  valueEn: 'angelic yet once',
};

export const sampleWithNewData: NewCryptoFeature = {
  value: 'massage for',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
