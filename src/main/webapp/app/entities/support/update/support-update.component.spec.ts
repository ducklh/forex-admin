import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { SupportService } from '../service/support.service';
import { ISupport } from '../support.model';
import { SupportFormService } from './support-form.service';

import { SupportUpdateComponent } from './support-update.component';

describe('Support Management Update Component', () => {
  let comp: SupportUpdateComponent;
  let fixture: ComponentFixture<SupportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let supportFormService: SupportFormService;
  let supportService: SupportService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SupportUpdateComponent],
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
      .overrideTemplate(SupportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SupportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    supportFormService = TestBed.inject(SupportFormService);
    supportService = TestBed.inject(SupportService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const support: ISupport = { id: 'db11bf8a-9a0c-49c7-9ec8-a0a719eedaea' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      support.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ support });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const support: ISupport = { id: 'db11bf8a-9a0c-49c7-9ec8-a0a719eedaea' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      support.broker = broker;

      activatedRoute.data = of({ support });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.support).toEqual(support);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupport>>();
      const support = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
      jest.spyOn(supportFormService, 'getSupport').mockReturnValue(support);
      jest.spyOn(supportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ support });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: support }));
      saveSubject.complete();

      // THEN
      expect(supportFormService.getSupport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(supportService.update).toHaveBeenCalledWith(expect.objectContaining(support));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupport>>();
      const support = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
      jest.spyOn(supportFormService, 'getSupport').mockReturnValue({ id: null });
      jest.spyOn(supportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ support: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: support }));
      saveSubject.complete();

      // THEN
      expect(supportFormService.getSupport).toHaveBeenCalled();
      expect(supportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupport>>();
      const support = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
      jest.spyOn(supportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ support });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(supportService.update).toHaveBeenCalled();
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
