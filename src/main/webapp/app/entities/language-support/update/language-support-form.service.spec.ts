import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../language-support.test-samples';

import { LanguageSupportFormService } from './language-support-form.service';

describe('LanguageSupport Form Service', () => {
  let service: LanguageSupportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSupportFormService);
  });

  describe('Service methods', () => {
    describe('createLanguageSupportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLanguageSupportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ILanguageSupport should create a new form with FormGroup', () => {
        const formGroup = service.createLanguageSupportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getLanguageSupport', () => {
      it('should return NewLanguageSupport for default LanguageSupport initial value', () => {
        const formGroup = service.createLanguageSupportFormGroup(sampleWithNewData);

        const languageSupport = service.getLanguageSupport(formGroup) as any;

        expect(languageSupport).toMatchObject(sampleWithNewData);
      });

      it('should return NewLanguageSupport for empty LanguageSupport initial value', () => {
        const formGroup = service.createLanguageSupportFormGroup();

        const languageSupport = service.getLanguageSupport(formGroup) as any;

        expect(languageSupport).toMatchObject({});
      });

      it('should return ILanguageSupport', () => {
        const formGroup = service.createLanguageSupportFormGroup(sampleWithRequiredData);

        const languageSupport = service.getLanguageSupport(formGroup) as any;

        expect(languageSupport).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILanguageSupport should not enable id FormControl', () => {
        const formGroup = service.createLanguageSupportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLanguageSupport should disable id FormControl', () => {
        const formGroup = service.createLanguageSupportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
