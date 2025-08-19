import { IInstrument, NewInstrument } from './instrument.model';

export const sampleWithRequiredData: IInstrument = {
  id: '587bd4fa-ad3c-4883-a782-51e9016446ce',
  value: 'why',
};

export const sampleWithPartialData: IInstrument = {
  id: 'e8b25b9c-5ded-4545-8ad6-1cc58a0083b6',
  value: 'whoever',
};

export const sampleWithFullData: IInstrument = {
  id: 'bf7568d4-18b7-4121-bad0-533404df5ee2',
  value: 'given',
  valueEn: 'winged tomorrow yesterday',
};

export const sampleWithNewData: NewInstrument = {
  value: 'instead frightfully',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
