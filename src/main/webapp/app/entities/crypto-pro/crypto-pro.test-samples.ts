import { ICryptoPro, NewCryptoPro } from './crypto-pro.model';

export const sampleWithRequiredData: ICryptoPro = {
  id: '14f1fac8-05df-4c7b-b418-ea83ca79f3dc',
  value: 'excluding',
};

export const sampleWithPartialData: ICryptoPro = {
  id: '646762f1-f5a5-4170-b8f0-1a2c0c56d4c4',
  value: 'citizen where um',
};

export const sampleWithFullData: ICryptoPro = {
  id: '213edef2-7f8a-42eb-bdf9-ddfef68a4143',
  value: 'astride brr obtrude',
  valueEn: 'adjourn briefly',
};

export const sampleWithNewData: NewCryptoPro = {
  value: 'boo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
