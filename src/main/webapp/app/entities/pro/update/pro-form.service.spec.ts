import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../pro.test-samples';

import { ProFormService } from './pro-form.service';

describe('Pro Form Service', () => {
  let service: ProFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProFormService);
  });

  describe('Service methods', () => {
    describe('createProFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            text: expect.any(Object),
            broker: expect.any(Object),
          }),
        );
      });

      it('passing IPro should create a new form with FormGroup', () => {
        const formGroup = service.createProFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            text: expect.any(Object),
            broker: expect.any(Object),
          }),
        );
      });
    });

    describe('getPro', () => {
      it('should return NewPro for default Pro initial value', () => {
        const formGroup = service.createProFormGroup(sampleWithNewData);

        const pro = service.getPro(formGroup) as any;

        expect(pro).toMatchObject(sampleWithNewData);
      });

      it('should return NewPro for empty Pro initial value', () => {
        const formGroup = service.createProFormGroup();

        const pro = service.getPro(formGroup) as any;

        expect(pro).toMatchObject({});
      });

      it('should return IPro', () => {
        const formGroup = service.createProFormGroup(sampleWithRequiredData);

        const pro = service.getPro(formGroup) as any;

        expect(pro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPro should not enable id FormControl', () => {
        const formGroup = service.createProFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPro should disable id FormControl', () => {
        const formGroup = service.createProFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
