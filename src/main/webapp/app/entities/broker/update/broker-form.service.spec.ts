import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../broker.test-samples';

import { BrokerFormService } from './broker-form.service';

describe('Broker Form Service', () => {
  let service: BrokerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokerFormService);
  });

  describe('Service methods', () => {
    describe('createBrokerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBrokerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            logo: expect.any(Object),
            url: expect.any(Object),
            description: expect.any(Object),
            rating: expect.any(Object),
            minDeposit: expect.any(Object),
            spreads: expect.any(Object),
            leverage: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
          }),
        );
      });

      it('passing IBroker should create a new form with FormGroup', () => {
        const formGroup = service.createBrokerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            logo: expect.any(Object),
            url: expect.any(Object),
            description: expect.any(Object),
            rating: expect.any(Object),
            minDeposit: expect.any(Object),
            spreads: expect.any(Object),
            leverage: expect.any(Object),
            founded: expect.any(Object),
            headquarters: expect.any(Object),
          }),
        );
      });
    });

    describe('getBroker', () => {
      it('should return NewBroker for default Broker initial value', () => {
        const formGroup = service.createBrokerFormGroup(sampleWithNewData);

        const broker = service.getBroker(formGroup) as any;

        expect(broker).toMatchObject(sampleWithNewData);
      });

      it('should return NewBroker for empty Broker initial value', () => {
        const formGroup = service.createBrokerFormGroup();

        const broker = service.getBroker(formGroup) as any;

        expect(broker).toMatchObject({});
      });

      it('should return IBroker', () => {
        const formGroup = service.createBrokerFormGroup(sampleWithRequiredData);

        const broker = service.getBroker(formGroup) as any;

        expect(broker).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBroker should not enable id FormControl', () => {
        const formGroup = service.createBrokerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBroker should disable id FormControl', () => {
        const formGroup = service.createBrokerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
