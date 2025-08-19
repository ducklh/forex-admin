import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../support.test-samples';

import { SupportFormService } from './support-form.service';

describe('Support Form Service', () => {
  let service: SupportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportFormService);
  });

  describe('Service methods', () => {
    describe('createSupportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSupportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ISupport should create a new form with FormGroup', () => {
        const formGroup = service.createSupportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getSupport', () => {
      it('should return NewSupport for default Support initial value', () => {
        const formGroup = service.createSupportFormGroup(sampleWithNewData);

        const support = service.getSupport(formGroup) as any;

        expect(support).toMatchObject(sampleWithNewData);
      });

      it('should return NewSupport for empty Support initial value', () => {
        const formGroup = service.createSupportFormGroup();

        const support = service.getSupport(formGroup) as any;

        expect(support).toMatchObject({});
      });

      it('should return ISupport', () => {
        const formGroup = service.createSupportFormGroup(sampleWithRequiredData);

        const support = service.getSupport(formGroup) as any;

        expect(support).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISupport should not enable id FormControl', () => {
        const formGroup = service.createSupportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSupport should disable id FormControl', () => {
        const formGroup = service.createSupportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
