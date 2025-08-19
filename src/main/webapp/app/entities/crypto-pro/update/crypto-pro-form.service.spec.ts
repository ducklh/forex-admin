import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../crypto-pro.test-samples';

import { CryptoProFormService } from './crypto-pro-form.service';

describe('CryptoPro Form Service', () => {
  let service: CryptoProFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoProFormService);
  });

  describe('Service methods', () => {
    describe('createCryptoProFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCryptoProFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICryptoPro should create a new form with FormGroup', () => {
        const formGroup = service.createCryptoProFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCryptoPro', () => {
      it('should return NewCryptoPro for default CryptoPro initial value', () => {
        const formGroup = service.createCryptoProFormGroup(sampleWithNewData);

        const cryptoPro = service.getCryptoPro(formGroup) as any;

        expect(cryptoPro).toMatchObject(sampleWithNewData);
      });

      it('should return NewCryptoPro for empty CryptoPro initial value', () => {
        const formGroup = service.createCryptoProFormGroup();

        const cryptoPro = service.getCryptoPro(formGroup) as any;

        expect(cryptoPro).toMatchObject({});
      });

      it('should return ICryptoPro', () => {
        const formGroup = service.createCryptoProFormGroup(sampleWithRequiredData);

        const cryptoPro = service.getCryptoPro(formGroup) as any;

        expect(cryptoPro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICryptoPro should not enable id FormControl', () => {
        const formGroup = service.createCryptoProFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCryptoPro should disable id FormControl', () => {
        const formGroup = service.createCryptoProFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
