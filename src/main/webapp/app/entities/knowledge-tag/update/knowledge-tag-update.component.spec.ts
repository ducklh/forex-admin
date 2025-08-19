import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { KnowledgeTagService } from '../service/knowledge-tag.service';
import { IKnowledgeTag } from '../knowledge-tag.model';
import { KnowledgeTagFormService } from './knowledge-tag-form.service';

import { KnowledgeTagUpdateComponent } from './knowledge-tag-update.component';

describe('KnowledgeTag Management Update Component', () => {
  let comp: KnowledgeTagUpdateComponent;
  let fixture: ComponentFixture<KnowledgeTagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let knowledgeTagFormService: KnowledgeTagFormService;
  let knowledgeTagService: KnowledgeTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KnowledgeTagUpdateComponent],
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
      .overrideTemplate(KnowledgeTagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KnowledgeTagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    knowledgeTagFormService = TestBed.inject(KnowledgeTagFormService);
    knowledgeTagService = TestBed.inject(KnowledgeTagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const knowledgeTag: IKnowledgeTag = { id: '2e3a5c16-9ac0-49dd-bc5c-1722ca706303' };

      activatedRoute.data = of({ knowledgeTag });
      comp.ngOnInit();

      expect(comp.knowledgeTag).toEqual(knowledgeTag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeTag>>();
      const knowledgeTag = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
      jest.spyOn(knowledgeTagFormService, 'getKnowledgeTag').mockReturnValue(knowledgeTag);
      jest.spyOn(knowledgeTagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeTag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knowledgeTag }));
      saveSubject.complete();

      // THEN
      expect(knowledgeTagFormService.getKnowledgeTag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(knowledgeTagService.update).toHaveBeenCalledWith(expect.objectContaining(knowledgeTag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeTag>>();
      const knowledgeTag = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
      jest.spyOn(knowledgeTagFormService, 'getKnowledgeTag').mockReturnValue({ id: null });
      jest.spyOn(knowledgeTagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeTag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: knowledgeTag }));
      saveSubject.complete();

      // THEN
      expect(knowledgeTagFormService.getKnowledgeTag).toHaveBeenCalled();
      expect(knowledgeTagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKnowledgeTag>>();
      const knowledgeTag = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
      jest.spyOn(knowledgeTagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ knowledgeTag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(knowledgeTagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
