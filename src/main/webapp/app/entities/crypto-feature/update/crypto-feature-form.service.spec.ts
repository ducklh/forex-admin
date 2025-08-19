import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../crypto-feature.test-samples';

import { CryptoFeatureFormService } from './crypto-feature-form.service';

describe('CryptoFeature Form Service', () => {
  let service: CryptoFeatureFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoFeatureFormService);
  });

  describe('Service methods', () => {
    describe('createCryptoFeatureFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCryptoFeatureFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICryptoFeature should create a new form with FormGroup', () => {
        const formGroup = service.createCryptoFeatureFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCryptoFeature', () => {
      it('should return NewCryptoFeature for default CryptoFeature initial value', () => {
        const formGroup = service.createCryptoFeatureFormGroup(sampleWithNewData);

        const cryptoFeature = service.getCryptoFeature(formGroup) as any;

        expect(cryptoFeature).toMatchObject(sampleWithNewData);
      });

      it('should return NewCryptoFeature for empty CryptoFeature initial value', () => {
        const formGroup = service.createCryptoFeatureFormGroup();

        const cryptoFeature = service.getCryptoFeature(formGroup) as any;

        expect(cryptoFeature).toMatchObject({});
      });

      it('should return ICryptoFeature', () => {
        const formGroup = service.createCryptoFeatureFormGroup(sampleWithRequiredData);

        const cryptoFeature = service.getCryptoFeature(formGroup) as any;

        expect(cryptoFeature).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICryptoFeature should not enable id FormControl', () => {
        const formGroup = service.createCryptoFeatureFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCryptoFeature should disable id FormControl', () => {
        const formGroup = service.createCryptoFeatureFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
