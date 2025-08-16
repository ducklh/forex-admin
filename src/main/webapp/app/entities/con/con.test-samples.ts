import { ICon, NewCon } from './con.model';

export const sampleWithRequiredData: ICon = {
  id: 'd5ab37e6-cfa0-4976-8f97-969851d6f526',
  text: 'knowledgeably sprinkles',
};

export const sampleWithPartialData: ICon = {
  id: '4fc47176-0d80-43be-a52d-27be6a14bc0e',
  text: 'ugh onset courteous',
};

export const sampleWithFullData: ICon = {
  id: '7e3158ee-ca50-43b2-b855-90b78daa101d',
  text: 'basket',
};

export const sampleWithNewData: NewCon = {
  text: 'swiftly questioningly near',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
