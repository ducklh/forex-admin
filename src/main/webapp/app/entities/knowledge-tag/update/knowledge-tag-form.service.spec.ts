import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../knowledge-tag.test-samples';

import { KnowledgeTagFormService } from './knowledge-tag-form.service';

describe('KnowledgeTag Form Service', () => {
  let service: KnowledgeTagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeTagFormService);
  });

  describe('Service methods', () => {
    describe('createKnowledgeTagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKnowledgeTagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });

      it('passing IKnowledgeTag should create a new form with FormGroup', () => {
        const formGroup = service.createKnowledgeTagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            valueEn: expect.any(Object),
          }),
        );
      });
    });

    describe('getKnowledgeTag', () => {
      it('should return NewKnowledgeTag for default KnowledgeTag initial value', () => {
        const formGroup = service.createKnowledgeTagFormGroup(sampleWithNewData);

        const knowledgeTag = service.getKnowledgeTag(formGroup) as any;

        expect(knowledgeTag).toMatchObject(sampleWithNewData);
      });

      it('should return NewKnowledgeTag for empty KnowledgeTag initial value', () => {
        const formGroup = service.createKnowledgeTagFormGroup();

        const knowledgeTag = service.getKnowledgeTag(formGroup) as any;

        expect(knowledgeTag).toMatchObject({});
      });

      it('should return IKnowledgeTag', () => {
        const formGroup = service.createKnowledgeTagFormGroup(sampleWithRequiredData);

        const knowledgeTag = service.getKnowledgeTag(formGroup) as any;

        expect(knowledgeTag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKnowledgeTag should not enable id FormControl', () => {
        const formGroup = service.createKnowledgeTagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKnowledgeTag should disable id FormControl', () => {
        const formGroup = service.createKnowledgeTagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
