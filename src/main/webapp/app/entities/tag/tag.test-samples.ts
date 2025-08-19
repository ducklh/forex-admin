import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: '8bd9c6e6-adf9-42f4-b752-d9698dffded2',
  value: 'coaxingly',
};

export const sampleWithPartialData: ITag = {
  id: 'bcc64cf6-9ea7-40cc-888d-9e082596b402',
  value: 'amongst',
};

export const sampleWithFullData: ITag = {
  id: 'ded83ece-eec4-4adb-8fe9-01685778b4fa',
  value: 'why clone',
  valueEn: 'ack',
};

export const sampleWithNewData: NewTag = {
  value: 'silk eek so',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
