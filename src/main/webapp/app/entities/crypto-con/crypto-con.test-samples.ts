import { ICryptoCon, NewCryptoCon } from './crypto-con.model';

export const sampleWithRequiredData: ICryptoCon = {
  id: 'cd1cb159-50c3-40e2-ac48-650f384d38a4',
  value: 'but seldom strictly',
};

export const sampleWithPartialData: ICryptoCon = {
  id: '7c507b66-e06d-46e0-9a8a-fc0207c76478',
  value: 'gee though especially',
  valueEn: 'pillow oof hm',
};

export const sampleWithFullData: ICryptoCon = {
  id: '58b4c68e-e3ba-43f4-bc74-fd2107e8420d',
  value: 'except that oof',
  valueEn: 'internalize to uncork',
};

export const sampleWithNewData: NewCryptoCon = {
  value: 'rightfully carboxyl',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
