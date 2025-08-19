import { ICon, NewCon } from './con.model';

export const sampleWithRequiredData: ICon = {
  id: 'd5ab37e6-cfa0-4976-8f97-969851d6f526',
  value: 'knowledgeably sprinkles',
};

export const sampleWithPartialData: ICon = {
  id: 'fc471760-d803-4be5-b2d2-7be6a14bc0e9',
  value: 'uh-huh',
  valueEn: 'from frankly',
};

export const sampleWithFullData: ICon = {
  id: '7e3158ee-ca50-43b2-b855-90b78daa101d',
  value: 'basket',
  valueEn: 'cutover',
};

export const sampleWithNewData: NewCon = {
  value: 'swiftly questioningly near',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
