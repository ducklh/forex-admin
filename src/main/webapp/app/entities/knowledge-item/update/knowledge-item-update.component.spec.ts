import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IKnowledgeTag } from 'app/entities/knowledge-tag/knowledge-tag.model';
import { KnowledgeTagService } from 'app/entities/knowledge-tag/service/knowledge-tag.service';
import { KnowledgeItemService } from '../service/knowledge-item.service';
import { IKnowledgeItem } from '../knowledge-item.model';
import { KnowledgeItemFormService } from './knowledge-item-form.service';

import { KnowledgeItemUpdateComponent } from './knowledge-item-update.component';

describe('KnowledgeItem Management Update Component', () => {
  let comp: KnowledgeItemUpdateComponent;
  let fixture: ComponentFixture<KnowledgeItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let knowledgeItemFormService: KnowledgeItemFormService;
  let knowledgeItemService: KnowledgeItemService;
  let knowledgeTagService: KnowledgeTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KnowledgeItemUpdateComponent],
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
      .overrideTemplate(KnowledgeItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KnowledgeItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    knowledgeItemFormService = TestBed.inject(KnowledgeItemFormService);
    knowledgeItemService = TestBed.inject(KnowledgeItemService);
    knowledgeTagService = TestBed.inject(KnowledgeTagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KnowledgeTag query and add missing value', () => {
      const knowledgeItem: IKnowledgeItem = { id: '0f9e2a94-e386-4d27-bf52-34b14e98683f' };
      const tags: IKnowledgeTag[] = [{ id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' }];
      knowledgeItem.tags = tags;

      const knowledgeTagCollection: IKnowledgeTag[] = [{ id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' }];
      jest.spyOn(knowledgeTagService, 'query').mockReturnValue(of(new HttpResponse({ body: knowledgeTagCollection })));
      const additionalKnowledgeTags = [...tags];
      const expectedCollection: IKnowledgeTag[] = [...additionalKnowledgeTags, ...knowledgeTagCollection];
      jest.spyOn(knowledgeTagService, 'addKnowledgeTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ knowledgeItem });
      comp.ngOnInit();

      expect(knowledgeTagService.query).toHaveBeenCalled();
      expect(knowledgeTagService.addKnowledgeTagToCollectionIfMissing).toHaveBeenCalledWith(
        knowledgeTagCollection,
        ...additionalKnowledgeTags.map(expect.objectContaining),
      );
      expect(comp.knowledgeTagsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const knowledgeItem: IKnowledgeItem = { id: '0f9e2a94-e386-4d27-bf52-34b14e98683f' };
      const tags: IKnowledgeTag = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
      knowledgeItem.tags = [tags];

      activatedRoute.data = of({ knowledgeItem });
      comp.ngOnInit();

      expect(comp.knowledgeTagsSharedCollection).toContainEqual(tags);
      expect(comp.knowledgeItem).toEqual(knowledgeItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeItem>>();
      const knowledgeItem = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
      jest.spyOn(knowledgeItemFormService, 'getKnowledgeItem').mockReturnValue(knowledgeItem);
      jest.spyOn(knowledgeItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knowledgeItem }));
      saveSubject.complete();

      // THEN
      expect(knowledgeItemFormService.getKnowledgeItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(knowledgeItemService.update).toHaveBeenCalledWith(expect.objectContaining(knowledgeItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeItem>>();
      const knowledgeItem = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
      jest.spyOn(knowledgeItemFormService, 'getKnowledgeItem').mockReturnValue({ id: null });
      jest.spyOn(knowledgeItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knowledgeItem }));
      saveSubject.complete();

      // THEN
      expect(knowledgeItemFormService.getKnowledgeItem).toHaveBeenCalled();
      expect(knowledgeItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeItem>>();
      const knowledgeItem = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
      jest.spyOn(knowledgeItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(knowledgeItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareKnowledgeTag', () => {
      it('Should forward to knowledgeTagService', () => {
        const entity = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
        const entity2 = { id: '2e3a5c16-9ac0-49dd-bc5c-1722ca706303' };
        jest.spyOn(knowledgeTagService, 'compareKnowledgeTag');
        comp.compareKnowledgeTag(entity, entity2);
        expect(knowledgeTagService.compareKnowledgeTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
