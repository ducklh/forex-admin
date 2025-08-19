import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../site-news-article.test-samples';

import { SiteNewsArticleFormService } from './site-news-article-form.service';

describe('SiteNewsArticle Form Service', () => {
  let service: SiteNewsArticleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteNewsArticleFormService);
  });

  describe('Service methods', () => {
    describe('createSiteNewsArticleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSiteNewsArticleFormGroup();

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
            author: expect.any(Object),
            publishedAt: expect.any(Object),
            readTime: expect.any(Object),
            image: expect.any(Object),
            fullContent: expect.any(Object),
            fullContentEn: expect.any(Object),
            tags: expect.any(Object),
          }),
        );
      });

      it('passing ISiteNewsArticle should create a new form with FormGroup', () => {
        const formGroup = service.createSiteNewsArticleFormGroup(sampleWithRequiredData);

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
            author: expect.any(Object),
            publishedAt: expect.any(Object),
            readTime: expect.any(Object),
            image: expect.any(Object),
            fullContent: expect.any(Object),
            fullContentEn: expect.any(Object),
            tags: expect.any(Object),
          }),
        );
      });
    });

    describe('getSiteNewsArticle', () => {
      it('should return NewSiteNewsArticle for default SiteNewsArticle initial value', () => {
        const formGroup = service.createSiteNewsArticleFormGroup(sampleWithNewData);

        const siteNewsArticle = service.getSiteNewsArticle(formGroup) as any;

        expect(siteNewsArticle).toMatchObject(sampleWithNewData);
      });

      it('should return NewSiteNewsArticle for empty SiteNewsArticle initial value', () => {
        const formGroup = service.createSiteNewsArticleFormGroup();

        const siteNewsArticle = service.getSiteNewsArticle(formGroup) as any;

        expect(siteNewsArticle).toMatchObject({});
      });

      it('should return ISiteNewsArticle', () => {
        const formGroup = service.createSiteNewsArticleFormGroup(sampleWithRequiredData);

        const siteNewsArticle = service.getSiteNewsArticle(formGroup) as any;

        expect(siteNewsArticle).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISiteNewsArticle should not enable id FormControl', () => {
        const formGroup = service.createSiteNewsArticleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSiteNewsArticle should disable id FormControl', () => {
        const formGroup = service.createSiteNewsArticleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
