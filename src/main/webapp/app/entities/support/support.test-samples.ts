import { ISupport, NewSupport } from './support.model';

export const sampleWithRequiredData: ISupport = {
  id: 'f00e71e9-de90-4ffa-b06c-a2c85f55de7c',
  value: 'spotless anti',
};

export const sampleWithPartialData: ISupport = {
  id: '4ee3a158-6446-4c17-8209-b3ffa90c96c6',
  value: 'accompany cafe',
  valueEn: 'sans anneal',
};

export const sampleWithFullData: ISupport = {
  id: '18706a2f-a340-491a-96d4-d2b6e396068f',
  value: 'by upright pfft',
  valueEn: 'neglected',
};

export const sampleWithNewData: NewSupport = {
  value: 'replacement helpfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
