import { ILanguageSupport, NewLanguageSupport } from './language-support.model';

export const sampleWithRequiredData: ILanguageSupport = {
  id: '079dab2d-e1da-4aaf-9273-0f75e7a299dc',
  value: 'round suspension down',
};

export const sampleWithPartialData: ILanguageSupport = {
  id: '5bd97ef9-59ec-469c-8bf7-a8daa27697ec',
  value: 'briskly cow scrap',
};

export const sampleWithFullData: ILanguageSupport = {
  id: 'b989ee08-b154-4bff-8786-06a56ecae63f',
  value: 'mutate phrase creamy',
  valueEn: 'jam-packed discrete',
};

export const sampleWithNewData: NewLanguageSupport = {
  value: 'ick nauseate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
