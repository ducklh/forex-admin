import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../coin.test-samples';

import { CoinFormService } from './coin-form.service';

describe('Coin Form Service', () => {
  let service: CoinFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinFormService);
  });

  describe('Service methods', () => {
    describe('createCoinFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCoinFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICoin should create a new form with FormGroup', () => {
        const formGroup = service.createCoinFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCoin', () => {
      it('should return NewCoin for default Coin initial value', () => {
        const formGroup = service.createCoinFormGroup(sampleWithNewData);

        const coin = service.getCoin(formGroup) as any;

        expect(coin).toMatchObject(sampleWithNewData);
      });

      it('should return NewCoin for empty Coin initial value', () => {
        const formGroup = service.createCoinFormGroup();

        const coin = service.getCoin(formGroup) as any;

        expect(coin).toMatchObject({});
      });

      it('should return ICoin', () => {
        const formGroup = service.createCoinFormGroup(sampleWithRequiredData);

        const coin = service.getCoin(formGroup) as any;

        expect(coin).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICoin should not enable id FormControl', () => {
        const formGroup = service.createCoinFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCoin should disable id FormControl', () => {
        const formGroup = service.createCoinFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
