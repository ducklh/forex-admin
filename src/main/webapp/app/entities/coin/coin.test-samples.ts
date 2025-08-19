import { ICoin, NewCoin } from './coin.model';

export const sampleWithRequiredData: ICoin = {
  id: '802cf5d3-cc14-42cc-8eb9-f18539576904',
  value: 'boo shush badly',
};

export const sampleWithPartialData: ICoin = {
  id: 'c8f5d8be-87ff-4720-bb52-592b94ca296e',
  value: 'worriedly',
};

export const sampleWithFullData: ICoin = {
  id: '25fffb96-cf76-4c7c-bf7d-dda4b9e131bd',
  value: 'jubilant huzzah',
  valueEn: 'persecute educated',
};

export const sampleWithNewData: NewCoin = {
  value: 'indeed anenst',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
