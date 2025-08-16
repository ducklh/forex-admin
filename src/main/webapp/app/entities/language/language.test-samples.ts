import { ILanguage, NewLanguage } from './language.model';

export const sampleWithRequiredData: ILanguage = {
  id: '87d07aa6-5bae-4667-9a7b-17cf8af92d94',
  code: 'frankly once',
  name: 'spring ew',
};

export const sampleWithPartialData: ILanguage = {
  id: 'f157f107-f24c-49e8-bf52-65f3277e170d',
  code: 'hawk',
  name: 'psst alongside',
};

export const sampleWithFullData: ILanguage = {
  id: '7f685b29-d145-4709-a56b-0b7024aa2074',
  code: 'pish once',
  name: 'miserably far ew',
};

export const sampleWithNewData: NewLanguage = {
  code: 'deliberately',
  name: 'wherever into descent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
