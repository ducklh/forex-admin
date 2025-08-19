import { IPro, NewPro } from './pro.model';

export const sampleWithRequiredData: IPro = {
  id: '8aa946b7-f955-4afc-8043-cbf4a4ea278a',
  value: 'partially goat duh',
};

export const sampleWithPartialData: IPro = {
  id: 'a91da761-f081-4f48-9d16-7b6d4815eb8d',
  value: 'zowie defiantly',
  valueEn: 'which spanish',
};

export const sampleWithFullData: IPro = {
  id: 'ce210e60-e59b-446b-8db9-60f4e1caa2d8',
  value: 'troubled hamburger dimly',
  valueEn: 'whereas',
};

export const sampleWithNewData: NewPro = {
  value: 'aside',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
