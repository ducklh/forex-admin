import { ICustomerSupport, NewCustomerSupport } from './customer-support.model';

export const sampleWithRequiredData: ICustomerSupport = {
  id: 'a12a180d-01c3-4f09-bc8c-c1839dd8df74',
  value: 'incidentally avaricious',
};

export const sampleWithPartialData: ICustomerSupport = {
  id: '8ba71d11-8e4a-4fdb-8e3b-534273bb2699',
  value: 'extent boohoo',
};

export const sampleWithFullData: ICustomerSupport = {
  id: '07127fde-8d14-4d71-bbe1-0b67299f2049',
  value: 'opera',
  valueEn: 'only angrily lovely',
};

export const sampleWithNewData: NewCustomerSupport = {
  value: 'loudly fortunately',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
