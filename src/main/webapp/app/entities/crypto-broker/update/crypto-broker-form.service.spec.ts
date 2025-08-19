import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../crypto-broker.test-samples';

import { CryptoBrokerFormService } from './crypto-broker-form.service';

describe('CryptoBroker Form Service', () => {
  let service: CryptoBrokerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoBrokerFormService);
  });

  describe('Service methods', () => {
    describe('createCryptoBrokerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCryptoBrokerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameEn: expect.any(Object),
            logo: expect.any(Object),
            url: expect.any(Object),
            description: expect.any(Object),
            descriptionEn: expect.any(Object),
            rating: expect.any(Object),
            regulation: expect.any(Object),
            minDeposit: expect.any(Object),
            tradingFees: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
            headquartersEn: expect.any(Object),
            tradingVolume: expect.any(Object),
            mobileApp: expect.any(Object),
            apiSupport: expect.any(Object),
            detailedDescription: expect.any(Object),
            detailedDescriptionEn: expect.any(Object),
            cryptoFeatures: expect.any(Object),
            supportedCoins: expect.any(Object),
            cryptoPros: expect.any(Object),
            cryptoCons: expect.any(Object),
            securityFeatures: expect.any(Object),
            paymentMethods: expect.any(Object),
            customerSupports: expect.any(Object),
          }),
        );
      });

      it('passing ICryptoBroker should create a new form with FormGroup', () => {
        const formGroup = service.createCryptoBrokerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameEn: expect.any(Object),
            logo: expect.any(Object),
            url: expect.any(Object),
            description: expect.any(Object),
            descriptionEn: expect.any(Object),
            rating: expect.any(Object),
            regulation: expect.any(Object),
            minDeposit: expect.any(Object),
            tradingFees: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
            headquartersEn: expect.any(Object),
            tradingVolume: expect.any(Object),
            mobileApp: expect.any(Object),
            apiSupport: expect.any(Object),
            detailedDescription: expect.any(Object),
            detailedDescriptionEn: expect.any(Object),
            cryptoFeatures: expect.any(Object),
            supportedCoins: expect.any(Object),
            cryptoPros: expect.any(Object),
            cryptoCons: expect.any(Object),
            securityFeatures: expect.any(Object),
            paymentMethods: expect.any(Object),
            customerSupports: expect.any(Object),
          }),
        );
      });
    });

    describe('getCryptoBroker', () => {
      it('should return NewCryptoBroker for default CryptoBroker initial value', () => {
        const formGroup = service.createCryptoBrokerFormGroup(sampleWithNewData);

        const cryptoBroker = service.getCryptoBroker(formGroup) as any;

        expect(cryptoBroker).toMatchObject(sampleWithNewData);
      });

      it('should return NewCryptoBroker for empty CryptoBroker initial value', () => {
        const formGroup = service.createCryptoBrokerFormGroup();

        const cryptoBroker = service.getCryptoBroker(formGroup) as any;

        expect(cryptoBroker).toMatchObject({});
      });

      it('should return ICryptoBroker', () => {
        const formGroup = service.createCryptoBrokerFormGroup(sampleWithRequiredData);

        const cryptoBroker = service.getCryptoBroker(formGroup) as any;

        expect(cryptoBroker).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICryptoBroker should not enable id FormControl', () => {
        const formGroup = service.createCryptoBrokerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCryptoBroker should disable id FormControl', () => {
        const formGroup = service.createCryptoBrokerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
