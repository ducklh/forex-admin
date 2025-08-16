import { IRegulation, NewRegulation } from './regulation.model';

export const sampleWithRequiredData: IRegulation = {
  id: '405a5dd7-60f4-483f-85fd-5f218a807763',
  authority: 'forswear round whoever',
};

export const sampleWithPartialData: IRegulation = {
  id: '05b659e9-0884-449c-ab0a-206176637e80',
  authority: 'arrogantly mesh instead',
};

export const sampleWithFullData: IRegulation = {
  id: 'ef8c8fc7-26f0-4966-8aa3-ad45041b849e',
  authority: 'astonishing',
};

export const sampleWithNewData: NewRegulation = {
  authority: 'bob beep',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
