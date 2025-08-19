import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../con.test-samples';

import { ConFormService } from './con-form.service';

describe('Con Form Service', () => {
  let service: ConFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConFormService);
  });

  describe('Service methods', () => {
    describe('createConFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ICon should create a new form with FormGroup', () => {
        const formGroup = service.createConFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getCon', () => {
      it('should return NewCon for default Con initial value', () => {
        const formGroup = service.createConFormGroup(sampleWithNewData);

        const con = service.getCon(formGroup) as any;

        expect(con).toMatchObject(sampleWithNewData);
      });

      it('should return NewCon for empty Con initial value', () => {
        const formGroup = service.createConFormGroup();

        const con = service.getCon(formGroup) as any;

        expect(con).toMatchObject({});
      });

      it('should return ICon', () => {
        const formGroup = service.createConFormGroup(sampleWithRequiredData);

        const con = service.getCon(formGroup) as any;

        expect(con).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICon should not enable id FormControl', () => {
        const formGroup = service.createConFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCon should disable id FormControl', () => {
        const formGroup = service.createConFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
