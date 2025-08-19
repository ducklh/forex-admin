import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../crypto-con.test-samples';

import { CryptoConFormService } from './crypto-con-form.service';

describe('CryptoCon Form Service', () => {
  let service: CryptoConFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoConFormService);
  });

  describe('Service methods', () => {
    describe('createCryptoConFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCryptoConFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICryptoCon should create a new form with FormGroup', () => {
        const formGroup = service.createCryptoConFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCryptoCon', () => {
      it('should return NewCryptoCon for default CryptoCon initial value', () => {
        const formGroup = service.createCryptoConFormGroup(sampleWithNewData);

        const cryptoCon = service.getCryptoCon(formGroup) as any;

        expect(cryptoCon).toMatchObject(sampleWithNewData);
      });

      it('should return NewCryptoCon for empty CryptoCon initial value', () => {
        const formGroup = service.createCryptoConFormGroup();

        const cryptoCon = service.getCryptoCon(formGroup) as any;

        expect(cryptoCon).toMatchObject({});
      });

      it('should return ICryptoCon', () => {
        const formGroup = service.createCryptoConFormGroup(sampleWithRequiredData);

        const cryptoCon = service.getCryptoCon(formGroup) as any;

        expect(cryptoCon).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICryptoCon should not enable id FormControl', () => {
        const formGroup = service.createCryptoConFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCryptoCon should disable id FormControl', () => {
        const formGroup = service.createCryptoConFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
