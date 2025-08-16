import { IPlatform, NewPlatform } from './platform.model';

export const sampleWithRequiredData: IPlatform = {
  id: '45372e47-ce6f-4f4d-b204-64c6a2c76a2f',
  name: 'mash pfft',
};

export const sampleWithPartialData: IPlatform = {
  id: '65998919-1c67-4352-9f2b-fd40eae4f9c8',
  name: 'sometimes',
};

export const sampleWithFullData: IPlatform = {
  id: 'f3372b88-ab00-42bc-832d-bcfc5edea35d',
  name: 'whoever curly who',
};

export const sampleWithNewData: NewPlatform = {
  name: 'or',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
