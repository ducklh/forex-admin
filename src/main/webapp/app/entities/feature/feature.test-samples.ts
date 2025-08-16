import { IFeature, NewFeature } from './feature.model';

export const sampleWithRequiredData: IFeature = {
  id: 'c524ee60-f681-4c47-9f62-131de9338faf',
  name: 'bah',
};

export const sampleWithPartialData: IFeature = {
  id: '529214ae-8086-4360-89a5-715bebba8f37',
  name: 'boo draw supposing',
};

export const sampleWithFullData: IFeature = {
  id: 'f1588f8b-174c-4309-8b0a-8534844373a1',
  name: 'ick pomelo',
};

export const sampleWithNewData: NewFeature = {
  name: 'watery',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
