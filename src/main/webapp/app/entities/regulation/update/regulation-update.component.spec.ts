import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { RegulationService } from '../service/regulation.service';
import { IRegulation } from '../regulation.model';
import { RegulationFormService } from './regulation-form.service';

import { RegulationUpdateComponent } from './regulation-update.component';

describe('Regulation Management Update Component', () => {
  let comp: RegulationUpdateComponent;
  let fixture: ComponentFixture<RegulationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let regulationFormService: RegulationFormService;
  let regulationService: RegulationService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegulationUpdateComponent],
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
      .overrideTemplate(RegulationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegulationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    regulationFormService = TestBed.inject(RegulationFormService);
    regulationService = TestBed.inject(RegulationService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const regulation: IRegulation = { id: '5c8c3687-208a-4f2d-8e84-f5ecec89e7bf' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      regulation.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ regulation });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const regulation: IRegulation = { id: '5c8c3687-208a-4f2d-8e84-f5ecec89e7bf' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      regulation.broker = broker;

      activatedRoute.data = of({ regulation });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.regulation).toEqual(regulation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegulation>>();
      const regulation = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
      jest.spyOn(regulationFormService, 'getRegulation').mockReturnValue(regulation);
      jest.spyOn(regulationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regulation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: regulation }));
      saveSubject.complete();

      // THEN
      expect(regulationFormService.getRegulation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(regulationService.update).toHaveBeenCalledWith(expect.objectContaining(regulation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegulation>>();
      const regulation = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
      jest.spyOn(regulationFormService, 'getRegulation').mockReturnValue({ id: null });
      jest.spyOn(regulationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regulation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: regulation }));
      saveSubject.complete();

      // THEN
      expect(regulationFormService.getRegulation).toHaveBeenCalled();
      expect(regulationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegulation>>();
      const regulation = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
      jest.spyOn(regulationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regulation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(regulationService.update).toHaveBeenCalled();
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
