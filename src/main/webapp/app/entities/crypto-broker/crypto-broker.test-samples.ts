import { ICryptoBroker, NewCryptoBroker } from './crypto-broker.model';

export const sampleWithRequiredData: ICryptoBroker = {
  id: '548971bb-ee22-4919-b81f-ff6a38138d91',
  name: 'hence',
};

export const sampleWithPartialData: ICryptoBroker = {
  id: 'e92075be-831c-459a-b8a2-00b07605f347',
  name: 'yuck',
  url: 'https://queasy-vibraphone.net/',
  description: '../fake-data/blob/hipster.txt',
  rating: 3872.24,
  minDeposit: 'queasily marimba justly',
  tradingVolume: 'amidst finger garrote',
  mobileApp: false,
  apiSupport: true,
};

export const sampleWithFullData: ICryptoBroker = {
  id: '31021d48-1a6b-4aea-8a74-8974b299b7ec',
  name: 'nasalise amid',
  nameEn: 'about director',
  logo: 'deliquesce consequently dowse',
  url: 'https://measly-secrecy.com',
  description: '../fake-data/blob/hipster.txt',
  descriptionEn: '../fake-data/blob/hipster.txt',
  rating: 1725.41,
  regulation: 'favorable',
  minDeposit: 'yuck down',
  tradingFees: 'know reschedule splurge',
  founded: 'self-reliant',
  headquarters: 'ape blah um',
  headquartersEn: 'mostly',
  tradingVolume: 'reprove strictly describe',
  mobileApp: false,
  apiSupport: true,
  detailedDescription: '../fake-data/blob/hipster.txt',
  detailedDescriptionEn: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCryptoBroker = {
  name: 'until creative',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
