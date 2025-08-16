import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { LanguageService } from '../service/language.service';
import { ILanguage } from '../language.model';
import { LanguageFormService } from './language-form.service';

import { LanguageUpdateComponent } from './language-update.component';

describe('Language Management Update Component', () => {
  let comp: LanguageUpdateComponent;
  let fixture: ComponentFixture<LanguageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let languageFormService: LanguageFormService;
  let languageService: LanguageService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LanguageUpdateComponent],
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
      .overrideTemplate(LanguageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LanguageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    languageFormService = TestBed.inject(LanguageFormService);
    languageService = TestBed.inject(LanguageService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const language: ILanguage = { id: '09d6518e-d3f5-4b30-a7cd-112e63d8a292' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      language.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ language });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const language: ILanguage = { id: '09d6518e-d3f5-4b30-a7cd-112e63d8a292' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      language.broker = broker;

      activatedRoute.data = of({ language });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.language).toEqual(language);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguage>>();
      const language = { id: 'dfa92605-e7fd-4e21-9d6b-b3a610f8169d' };
      jest.spyOn(languageFormService, 'getLanguage').mockReturnValue(language);
      jest.spyOn(languageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ language });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: language }));
      saveSubject.complete();

      // THEN
      expect(languageFormService.getLanguage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(languageService.update).toHaveBeenCalledWith(expect.objectContaining(language));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguage>>();
      const language = { id: 'dfa92605-e7fd-4e21-9d6b-b3a610f8169d' };
      jest.spyOn(languageFormService, 'getLanguage').mockReturnValue({ id: null });
      jest.spyOn(languageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ language: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: language }));
      saveSubject.complete();

      // THEN
      expect(languageFormService.getLanguage).toHaveBeenCalled();
      expect(languageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILanguage>>();
      const language = { id: 'dfa92605-e7fd-4e21-9d6b-b3a610f8169d' };
      jest.spyOn(languageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ language });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(languageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBroker', () => {
      it('Should forward to brokerService', () => {
        const entity = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
        const entity2 = { id: '71abe793-642a-4ca6-a811-2bf9b91fef05' };
        jest.spyOn(brokerService, 'compareBroker');
        comp.compareBroker(entity, entity2);
        expect(brokerService.compareBroker).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
