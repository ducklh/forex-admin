import { ICryptoBroker, NewCryptoBroker } from './crypto-broker.model';

export const sampleWithRequiredData: ICryptoBroker = {
  id: '548971bb-ee22-4919-b81f-ff6a38138d91',
  name: 'hence',
};

export const sampleWithPartialData: ICryptoBroker = {
  id: '075be831-c59a-48a2-a00b-07605f347e3e',
  name: 'vibraphone swine',
  description: 'besides pro circle',
  rating: 29058.49,
  regulation: 'regarding absolve jogging',
  tradingFees: 'huge airbus into',
  headquarters: 'collaborate',
  tradingVolume: 'indeed possession ah',
  securityFeatures: '../fake-data/blob/hipster.txt',
  detailedDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICryptoBroker = {
  id: '31021d48-1a6b-4aea-8a74-8974b299b7ec',
  name: 'nasalise amid',
  logo: 'about director',
  url: 'https://artistic-contrail.org',
  description: 'teeming shrill circular',
  rating: 1725.41,
  features: '../fake-data/blob/hipster.txt',
  regulation: 'favorable',
  minDeposit: 'yuck down',
  tradingFees: 'know reschedule splurge',
  supportedCoins: '../fake-data/blob/hipster.txt',
  pros: '../fake-data/blob/hipster.txt',
  cons: '../fake-data/blob/hipster.txt',
  founded: 'self-reliant',
  headquarters: 'ape blah um',
  tradingVolume: 'mostly',
  securityFeatures: '../fake-data/blob/hipster.txt',
  paymentMethods: '../fake-data/blob/hipster.txt',
  customerSupport: '../fake-data/blob/hipster.txt',
  mobileApp: false,
  apiSupport: true,
  detailedDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCryptoBroker = {
  name: 'until creative',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
