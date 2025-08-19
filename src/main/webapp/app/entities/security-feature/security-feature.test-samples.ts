import { ISecurityFeature, NewSecurityFeature } from './security-feature.model';

export const sampleWithRequiredData: ISecurityFeature = {
  id: 'b6e079e7-6e6d-4a57-bae7-f35da026d106',
  value: 'passport obtrude pants',
};

export const sampleWithPartialData: ISecurityFeature = {
  id: '976159d2-afbc-4953-9ab2-9d6014c84d36',
  value: 'oof',
};

export const sampleWithFullData: ISecurityFeature = {
  id: '2f868192-1899-4164-87ee-50a4fb13e239',
  value: 'a overvalue',
  valueEn: 'cone',
};

export const sampleWithNewData: NewSecurityFeature = {
  value: 'boohoo thankfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
