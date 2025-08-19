import { IKnowledgeTag, NewKnowledgeTag } from './knowledge-tag.model';

export const sampleWithRequiredData: IKnowledgeTag = {
  id: '8cbc0ef8-03e5-48f7-b63f-a1c94866efa4',
  value: 'corrupt',
};

export const sampleWithPartialData: IKnowledgeTag = {
  id: 'f215b182-c056-4fb6-81f2-ac542d6c5659',
  value: 'along',
  valueEn: 'who brr',
};

export const sampleWithFullData: IKnowledgeTag = {
  id: 'acbba207-262f-4fdf-b696-3da38ced011d',
  value: 'though',
  valueEn: 'phew',
};

export const sampleWithNewData: NewKnowledgeTag = {
  value: 'oh blossom or',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
