import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../platform.test-samples';

import { PlatformFormService } from './platform-form.service';

describe('Platform Form Service', () => {
  let service: PlatformFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformFormService);
  });

  describe('Service methods', () => {
    describe('createPlatformFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlatformFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing IPlatform should create a new form with FormGroup', () => {
        const formGroup = service.createPlatformFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getPlatform', () => {
      it('should return NewPlatform for default Platform initial value', () => {
        const formGroup = service.createPlatformFormGroup(sampleWithNewData);

        const platform = service.getPlatform(formGroup) as any;

        expect(platform).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlatform for empty Platform initial value', () => {
        const formGroup = service.createPlatformFormGroup();

        const platform = service.getPlatform(formGroup) as any;

        expect(platform).toMatchObject({});
      });

      it('should return IPlatform', () => {
        const formGroup = service.createPlatformFormGroup(sampleWithRequiredData);

        const platform = service.getPlatform(formGroup) as any;

        expect(platform).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlatform should not enable id FormControl', () => {
        const formGroup = service.createPlatformFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlatform should disable id FormControl', () => {
        const formGroup = service.createPlatformFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
