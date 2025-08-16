import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { InstrumentService } from '../service/instrument.service';
import { IInstrument } from '../instrument.model';
import { InstrumentFormService } from './instrument-form.service';

import { InstrumentUpdateComponent } from './instrument-update.component';

describe('Instrument Management Update Component', () => {
  let comp: InstrumentUpdateComponent;
  let fixture: ComponentFixture<InstrumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let instrumentFormService: InstrumentFormService;
  let instrumentService: InstrumentService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InstrumentUpdateComponent],
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
      .overrideTemplate(InstrumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstrumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    instrumentFormService = TestBed.inject(InstrumentFormService);
    instrumentService = TestBed.inject(InstrumentService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const instrument: IInstrument = { id: '9f86699a-96ef-4bc7-a5bc-58e11e0359a6' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      instrument.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const instrument: IInstrument = { id: '9f86699a-96ef-4bc7-a5bc-58e11e0359a6' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      instrument.broker = broker;

      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.instrument).toEqual(instrument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentFormService, 'getInstrument').mockReturnValue(instrument);
      jest.spyOn(instrumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrument }));
      saveSubject.complete();

      // THEN
      expect(instrumentFormService.getInstrument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(instrumentService.update).toHaveBeenCalledWith(expect.objectContaining(instrument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentFormService, 'getInstrument').mockReturnValue({ id: null });
      jest.spyOn(instrumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrument }));
      saveSubject.complete();

      // THEN
      expect(instrumentFormService.getInstrument).toHaveBeenCalled();
      expect(instrumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(instrumentService.update).toHaveBeenCalled();
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
