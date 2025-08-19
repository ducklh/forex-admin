import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { LanguageSupportService } from '../service/language-support.service';
import { ILanguageSupport } from '../language-support.model';
import { LanguageSupportFormService } from './language-support-form.service';

import { LanguageSupportUpdateComponent } from './language-support-update.component';

describe('LanguageSupport Management Update Component', () => {
  let comp: LanguageSupportUpdateComponent;
  let fixture: ComponentFixture<LanguageSupportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let languageSupportFormService: LanguageSupportFormService;
  let languageSupportService: LanguageSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LanguageSupportUpdateComponent],
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
      .overrideTemplate(LanguageSupportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LanguageSupportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    languageSupportFormService = TestBed.inject(LanguageSupportFormService);
    languageSupportService = TestBed.inject(LanguageSupportService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const languageSupport: ILanguageSupport = { id: '27b0f6b1-b1e4-4479-a46f-4ec971d6a336' };

      activatedRoute.data = of({ languageSupport });
      comp.ngOnInit();

      expect(comp.languageSupport).toEqual(languageSupport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguageSupport>>();
      const languageSupport = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
      jest.spyOn(languageSupportFormService, 'getLanguageSupport').mockReturnValue(languageSupport);
      jest.spyOn(languageSupportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ languageSupport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: languageSupport }));
      saveSubject.complete();

      // THEN
      expect(languageSupportFormService.getLanguageSupport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(languageSupportService.update).toHaveBeenCalledWith(expect.objectContaining(languageSupport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguageSupport>>();
      const languageSupport = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
      jest.spyOn(languageSupportFormService, 'getLanguageSupport').mockReturnValue({ id: null });
      jest.spyOn(languageSupportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ languageSupport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: languageSupport }));
      saveSubject.complete();

      // THEN
      expect(languageSupportFormService.getLanguageSupport).toHaveBeenCalled();
      expect(languageSupportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguageSupport>>();
      const languageSupport = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
      jest.spyOn(languageSupportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ languageSupport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(languageSupportService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
