import { IPlatform, NewPlatform } from './platform.model';

export const sampleWithRequiredData: IPlatform = {
  id: '45372e47-ce6f-4f4d-b204-64c6a2c76a2f',
  value: 'mash pfft',
};

export const sampleWithPartialData: IPlatform = {
  id: '59989191-c673-452f-82bf-d40eae4f9c87',
  value: 'teriyaki courteous',
  valueEn: 'once oh meh',
};

export const sampleWithFullData: IPlatform = {
  id: 'f3372b88-ab00-42bc-832d-bcfc5edea35d',
  value: 'whoever curly who',
  valueEn: 'sparse release',
};

export const sampleWithNewData: NewPlatform = {
  value: 'or',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
