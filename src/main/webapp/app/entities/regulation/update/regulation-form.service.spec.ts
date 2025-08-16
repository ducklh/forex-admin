import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../regulation.test-samples';

import { RegulationFormService } from './regulation-form.service';

describe('Regulation Form Service', () => {
  let service: RegulationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulationFormService);
  });

  describe('Service methods', () => {
    describe('createRegulationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRegulationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            authority: expect.any(Object),
            broker: expect.any(Object),
          }),
        );
      });

      it('passing IRegulation should create a new form with FormGroup', () => {
        const formGroup = service.createRegulationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            authority: expect.any(Object),
            broker: expect.any(Object),
          }),
        );
      });
    });

    describe('getRegulation', () => {
      it('should return NewRegulation for default Regulation initial value', () => {
        const formGroup = service.createRegulationFormGroup(sampleWithNewData);

        const regulation = service.getRegulation(formGroup) as any;

        expect(regulation).toMatchObject(sampleWithNewData);
      });

      it('should return NewRegulation for empty Regulation initial value', () => {
        const formGroup = service.createRegulationFormGroup();

        const regulation = service.getRegulation(formGroup) as any;

        expect(regulation).toMatchObject({});
      });

      it('should return IRegulation', () => {
        const formGroup = service.createRegulationFormGroup(sampleWithRequiredData);

        const regulation = service.getRegulation(formGroup) as any;

        expect(regulation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRegulation should not enable id FormControl', () => {
        const formGroup = service.createRegulationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRegulation should disable id FormControl', () => {
        const formGroup = service.createRegulationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
