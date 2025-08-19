import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../crypto-payment-method.test-samples';

import { CryptoPaymentMethodFormService } from './crypto-payment-method-form.service';

describe('CryptoPaymentMethod Form Service', () => {
  let service: CryptoPaymentMethodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoPaymentMethodFormService);
  });

  describe('Service methods', () => {
    describe('createCryptoPaymentMethodFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICryptoPaymentMethod should create a new form with FormGroup', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCryptoPaymentMethod', () => {
      it('should return NewCryptoPaymentMethod for default CryptoPaymentMethod initial value', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup(sampleWithNewData);

        const cryptoPaymentMethod = service.getCryptoPaymentMethod(formGroup) as any;

        expect(cryptoPaymentMethod).toMatchObject(sampleWithNewData);
      });

      it('should return NewCryptoPaymentMethod for empty CryptoPaymentMethod initial value', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup();

        const cryptoPaymentMethod = service.getCryptoPaymentMethod(formGroup) as any;

        expect(cryptoPaymentMethod).toMatchObject({});
      });

      it('should return ICryptoPaymentMethod', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup(sampleWithRequiredData);

        const cryptoPaymentMethod = service.getCryptoPaymentMethod(formGroup) as any;

        expect(cryptoPaymentMethod).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICryptoPaymentMethod should not enable id FormControl', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCryptoPaymentMethod should disable id FormControl', () => {
        const formGroup = service.createCryptoPaymentMethodFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
