import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../knowledge-item.test-samples';

import { KnowledgeItemFormService } from './knowledge-item-form.service';

describe('KnowledgeItem Form Service', () => {
  let service: KnowledgeItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeItemFormService);
  });

  describe('Service methods', () => {
    describe('createKnowledgeItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKnowledgeItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            titleEn: expect.any(Object),
            excerpt: expect.any(Object),
            excerptEn: expect.any(Object),
            content: expect.any(Object),
            contentEn: expect.any(Object),
            category: expect.any(Object),
            categoryEn: expect.any(Object),
            level: expect.any(Object),
            levelEn: expect.any(Object),
            author: expect.any(Object),
            publishedAt: expect.any(Object),
            readTime: expect.any(Object),
            image: expect.any(Object),
            tags: expect.any(Object),
          }),
        );
      });

      it('passing IKnowledgeItem should create a new form with FormGroup', () => {
        const formGroup = service.createKnowledgeItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            titleEn: expect.any(Object),
            excerpt: expect.any(Object),
            excerptEn: expect.any(Object),
            content: expect.any(Object),
            contentEn: expect.any(Object),
            category: expect.any(Object),
            categoryEn: expect.any(Object),
            level: expect.any(Object),
            levelEn: expect.any(Object),
            author: expect.any(Object),
            publishedAt: expect.any(Object),
            readTime: expect.any(Object),
            image: expect.any(Object),
            tags: expect.any(Object),
          }),
        );
      });
    });

    describe('getKnowledgeItem', () => {
      it('should return NewKnowledgeItem for default KnowledgeItem initial value', () => {
        const formGroup = service.createKnowledgeItemFormGroup(sampleWithNewData);

        const knowledgeItem = service.getKnowledgeItem(formGroup) as any;

        expect(knowledgeItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewKnowledgeItem for empty KnowledgeItem initial value', () => {
        const formGroup = service.createKnowledgeItemFormGroup();

        const knowledgeItem = service.getKnowledgeItem(formGroup) as any;

        expect(knowledgeItem).toMatchObject({});
      });

      it('should return IKnowledgeItem', () => {
        const formGroup = service.createKnowledgeItemFormGroup(sampleWithRequiredData);

        const knowledgeItem = service.getKnowledgeItem(formGroup) as any;

        expect(knowledgeItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKnowledgeItem should not enable id FormControl', () => {
        const formGroup = service.createKnowledgeItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKnowledgeItem should disable id FormControl', () => {
        const formGroup = service.createKnowledgeItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
