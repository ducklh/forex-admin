import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../forex-broker.test-samples';

import { ForexBrokerFormService } from './forex-broker-form.service';

describe('ForexBroker Form Service', () => {
  let service: ForexBrokerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForexBrokerFormService);
  });

  describe('Service methods', () => {
    describe('createForexBrokerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createForexBrokerFormGroup();

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
            spreads: expect.any(Object),
            leverage: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
            headquartersEn: expect.any(Object),
            forexFeatures: expect.any(Object),
            forexPlatforms: expect.any(Object),
            forexInstruments: expect.any(Object),
            forexPros: expect.any(Object),
            forexCons: expect.any(Object),
            forexLanguages: expect.any(Object),
            forexSupports: expect.any(Object),
            forexPaymentMethods: expect.any(Object),
          }),
        );
      });

      it('passing IForexBroker should create a new form with FormGroup', () => {
        const formGroup = service.createForexBrokerFormGroup(sampleWithRequiredData);

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
            spreads: expect.any(Object),
            leverage: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
            headquartersEn: expect.any(Object),
            forexFeatures: expect.any(Object),
            forexPlatforms: expect.any(Object),
            forexInstruments: expect.any(Object),
            forexPros: expect.any(Object),
            forexCons: expect.any(Object),
            forexLanguages: expect.any(Object),
            forexSupports: expect.any(Object),
            forexPaymentMethods: expect.any(Object),
          }),
        );
      });
    });

    describe('getForexBroker', () => {
      it('should return NewForexBroker for default ForexBroker initial value', () => {
        const formGroup = service.createForexBrokerFormGroup(sampleWithNewData);

        const forexBroker = service.getForexBroker(formGroup) as any;

        expect(forexBroker).toMatchObject(sampleWithNewData);
      });

      it('should return NewForexBroker for empty ForexBroker initial value', () => {
        const formGroup = service.createForexBrokerFormGroup();

        const forexBroker = service.getForexBroker(formGroup) as any;

        expect(forexBroker).toMatchObject({});
      });

      it('should return IForexBroker', () => {
        const formGroup = service.createForexBrokerFormGroup(sampleWithRequiredData);

        const forexBroker = service.getForexBroker(formGroup) as any;

        expect(forexBroker).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IForexBroker should not enable id FormControl', () => {
        const formGroup = service.createForexBrokerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewForexBroker should disable id FormControl', () => {
        const formGroup = service.createForexBrokerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
