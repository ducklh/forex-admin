import { IFeature, NewFeature } from './feature.model';

export const sampleWithRequiredData: IFeature = {
  id: 'c524ee60-f681-4c47-9f62-131de9338faf',
  value: 'bah',
};

export const sampleWithPartialData: IFeature = {
  id: '29214ae8-0863-4609-ba57-15bebba8f371',
  value: 'er astride unfinished',
  valueEn: 'afore',
};

export const sampleWithFullData: IFeature = {
  id: 'f1588f8b-174c-4309-8b0a-8534844373a1',
  value: 'ick pomelo',
  valueEn: 'than',
};

export const sampleWithNewData: NewFeature = {
  value: 'watery',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
