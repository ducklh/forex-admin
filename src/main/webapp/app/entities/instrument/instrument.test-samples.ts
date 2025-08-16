import { IInstrument, NewInstrument } from './instrument.model';

export const sampleWithRequiredData: IInstrument = {
  id: '587bd4fa-ad3c-4883-a782-51e9016446ce',
  name: 'why',
};

export const sampleWithPartialData: IInstrument = {
  id: 'fe8b25b9-c5de-4d54-95ad-61cc58a0083b',
  name: 'till',
};

export const sampleWithFullData: IInstrument = {
  id: 'bf7568d4-18b7-4121-bad0-533404df5ee2',
  name: 'given',
};

export const sampleWithNewData: NewInstrument = {
  name: 'instead frightfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
