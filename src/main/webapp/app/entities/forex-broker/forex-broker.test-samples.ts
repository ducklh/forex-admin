import { IForexBroker, NewForexBroker } from './forex-broker.model';

export const sampleWithRequiredData: IForexBroker = {
  id: '7d9ab3b4-d6f0-4744-8c5e-c28d6b29bcf7',
  name: 'whose',
};

export const sampleWithPartialData: IForexBroker = {
  id: 'e6440aa8-03ab-4e91-a097-e3096c9479e5',
  name: 'tenant grizzled',
  nameEn: 'charter store dimly',
  description: '../fake-data/blob/hipster.txt',
  rating: 14356.54,
  regulation: 'oh instead',
  minDeposit: 'eek why fray',
  headquartersEn: 'uncommon limply',
};

export const sampleWithFullData: IForexBroker = {
  id: '85ef31c8-be85-4c66-856f-6fdee50f09df',
  name: 'tasty',
  nameEn: 'triumphantly knowledgeably',
  logo: 'including doting indeed',
  url: 'https://cloudy-embarrassment.net',
  description: '../fake-data/blob/hipster.txt',
  descriptionEn: '../fake-data/blob/hipster.txt',
  rating: 32414.73,
  regulation: 'where gum',
  minDeposit: 'given badly ascertain',
  spreads: 'ravioli',
  leverage: 'orient safely',
  founded: 'ah supposing which',
  headquarters: 'zen who',
  headquartersEn: 'swat fooey quantify',
};

export const sampleWithNewData: NewForexBroker = {
  name: 'around',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
