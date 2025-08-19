import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { SiteNewsArticleService } from '../service/site-news-article.service';
import { ISiteNewsArticle } from '../site-news-article.model';
import { SiteNewsArticleFormService } from './site-news-article-form.service';

import { SiteNewsArticleUpdateComponent } from './site-news-article-update.component';

describe('SiteNewsArticle Management Update Component', () => {
  let comp: SiteNewsArticleUpdateComponent;
  let fixture: ComponentFixture<SiteNewsArticleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let siteNewsArticleFormService: SiteNewsArticleFormService;
  let siteNewsArticleService: SiteNewsArticleService;
  let tagService: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteNewsArticleUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SiteNewsArticleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SiteNewsArticleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    siteNewsArticleFormService = TestBed.inject(SiteNewsArticleFormService);
    siteNewsArticleService = TestBed.inject(SiteNewsArticleService);
    tagService = TestBed.inject(TagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Tag query and add missing value', () => {
      const siteNewsArticle: ISiteNewsArticle = { id: 'dc18da29-04ae-45d6-a07d-933825288b28' };
      const tags: ITag[] = [{ id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' }];
      siteNewsArticle.tags = tags;

      const tagCollection: ITag[] = [{ id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' }];
      jest.spyOn(tagService, 'query').mockReturnValue(of(new HttpResponse({ body: tagCollection })));
      const additionalTags = [...tags];
      const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
      jest.spyOn(tagService, 'addTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ siteNewsArticle });
      comp.ngOnInit();

      expect(tagService.query).toHaveBeenCalled();
      expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(tagCollection, ...additionalTags.map(expect.objectContaining));
      expect(comp.tagsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const siteNewsArticle: ISiteNewsArticle = { id: 'dc18da29-04ae-45d6-a07d-933825288b28' };
      const tags: ITag = { id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' };
      siteNewsArticle.tags = [tags];

      activatedRoute.data = of({ siteNewsArticle });
      comp.ngOnInit();

      expect(comp.tagsSharedCollection).toContainEqual(tags);
      expect(comp.siteNewsArticle).toEqual(siteNewsArticle);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteNewsArticle>>();
      const siteNewsArticle = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
      jest.spyOn(siteNewsArticleFormService, 'getSiteNewsArticle').mockReturnValue(siteNewsArticle);
      jest.spyOn(siteNewsArticleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteNewsArticle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: siteNewsArticle }));
      saveSubject.complete();

      // THEN
      expect(siteNewsArticleFormService.getSiteNewsArticle).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(siteNewsArticleService.update).toHaveBeenCalledWith(expect.objectContaining(siteNewsArticle));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteNewsArticle>>();
      const siteNewsArticle = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
      jest.spyOn(siteNewsArticleFormService, 'getSiteNewsArticle').mockReturnValue({ id: null });
      jest.spyOn(siteNewsArticleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteNewsArticle: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: siteNewsArticle }));
      saveSubject.complete();

      // THEN
      expect(siteNewsArticleFormService.getSiteNewsArticle).toHaveBeenCalled();
      expect(siteNewsArticleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteNewsArticle>>();
      const siteNewsArticle = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
      jest.spyOn(siteNewsArticleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteNewsArticle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(siteNewsArticleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTag', () => {
      it('Should forward to tagService', () => {
        const entity = { id: '98ee8ea3-644a-40e1-a41d-945852ec36b4' };
        const entity2 = { id: '5a0a2837-7a7b-4933-be56-a0b190ca7642' };
        jest.spyOn(tagService, 'compareTag');
        comp.compareTag(entity, entity2);
        expect(tagService.compareTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
