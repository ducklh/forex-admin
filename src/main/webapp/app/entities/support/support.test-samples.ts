import { ISupport, NewSupport } from './support.model';

export const sampleWithRequiredData: ISupport = {
  id: 'f00e71e9-de90-4ffa-b06c-a2c85f55de7c',
  type: 'spotless anti',
};

export const sampleWithPartialData: ISupport = {
  id: '74ee3a15-8644-46c1-9720-9b3ffa90c96c',
  type: 'among',
};

export const sampleWithFullData: ISupport = {
  id: '18706a2f-a340-491a-96d4-d2b6e396068f',
  type: 'by upright pfft',
};

export const sampleWithNewData: NewSupport = {
  type: 'replacement helpfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
