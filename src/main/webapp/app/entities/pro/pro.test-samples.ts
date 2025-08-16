import { IPro, NewPro } from './pro.model';

export const sampleWithRequiredData: IPro = {
  id: '8aa946b7-f955-4afc-8043-cbf4a4ea278a',
  text: 'partially goat duh',
};

export const sampleWithPartialData: IPro = {
  id: '0a91da76-1f08-41f4-b8d1-67b6d4815eb8',
  text: 'glittering bungalow',
};

export const sampleWithFullData: IPro = {
  id: 'ce210e60-e59b-446b-8db9-60f4e1caa2d8',
  text: 'troubled hamburger dimly',
};

export const sampleWithNewData: NewPro = {
  text: 'aside',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
