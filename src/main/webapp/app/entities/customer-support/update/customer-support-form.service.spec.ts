import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../customer-support.test-samples';

import { CustomerSupportFormService } from './customer-support-form.service';

describe('CustomerSupport Form Service', () => {
  let service: CustomerSupportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSupportFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerSupportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerSupportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICustomerSupport should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerSupportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCustomerSupport', () => {
      it('should return NewCustomerSupport for default CustomerSupport initial value', () => {
        const formGroup = service.createCustomerSupportFormGroup(sampleWithNewData);

        const customerSupport = service.getCustomerSupport(formGroup) as any;

        expect(customerSupport).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerSupport for empty CustomerSupport initial value', () => {
        const formGroup = service.createCustomerSupportFormGroup();

        const customerSupport = service.getCustomerSupport(formGroup) as any;

        expect(customerSupport).toMatchObject({});
      });

      it('should return ICustomerSupport', () => {
        const formGroup = service.createCustomerSupportFormGroup(sampleWithRequiredData);

        const customerSupport = service.getCustomerSupport(formGroup) as any;

        expect(customerSupport).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerSupport should not enable id FormControl', () => {
        const formGroup = service.createCustomerSupportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerSupport should disable id FormControl', () => {
        const formGroup = service.createCustomerSupportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
