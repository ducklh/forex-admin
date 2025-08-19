import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../security-feature.test-samples';

import { SecurityFeatureFormService } from './security-feature-form.service';

describe('SecurityFeature Form Service', () => {
  let service: SecurityFeatureFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityFeatureFormService);
  });

  describe('Service methods', () => {
    describe('createSecurityFeatureFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSecurityFeatureFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing ISecurityFeature should create a new form with FormGroup', () => {
        const formGroup = service.createSecurityFeatureFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getSecurityFeature', () => {
      it('should return NewSecurityFeature for default SecurityFeature initial value', () => {
        const formGroup = service.createSecurityFeatureFormGroup(sampleWithNewData);

        const securityFeature = service.getSecurityFeature(formGroup) as any;

        expect(securityFeature).toMatchObject(sampleWithNewData);
      });

      it('should return NewSecurityFeature for empty SecurityFeature initial value', () => {
        const formGroup = service.createSecurityFeatureFormGroup();

        const securityFeature = service.getSecurityFeature(formGroup) as any;

        expect(securityFeature).toMatchObject({});
      });

      it('should return ISecurityFeature', () => {
        const formGroup = service.createSecurityFeatureFormGroup(sampleWithRequiredData);

        const securityFeature = service.getSecurityFeature(formGroup) as any;

        expect(securityFeature).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISecurityFeature should not enable id FormControl', () => {
        const formGroup = service.createSecurityFeatureFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSecurityFeature should disable id FormControl', () => {
        const formGroup = service.createSecurityFeatureFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
