import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { PaymentMethodService } from '../service/payment-method.service';
import { IPaymentMethod } from '../payment-method.model';
import { PaymentMethodFormService } from './payment-method-form.service';

import { PaymentMethodUpdateComponent } from './payment-method-update.component';

describe('PaymentMethod Management Update Component', () => {
  let comp: PaymentMethodUpdateComponent;
  let fixture: ComponentFixture<PaymentMethodUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentMethodFormService: PaymentMethodFormService;
  let paymentMethodService: PaymentMethodService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentMethodUpdateComponent],
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
      .overrideTemplate(PaymentMethodUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentMethodFormService = TestBed.inject(PaymentMethodFormService);
    paymentMethodService = TestBed.inject(PaymentMethodService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const paymentMethod: IPaymentMethod = { id: '64f1e578-92ea-42c7-871a-a3cd58619324' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      paymentMethod.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentMethod });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentMethod: IPaymentMethod = { id: '64f1e578-92ea-42c7-871a-a3cd58619324' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      paymentMethod.broker = broker;

      activatedRoute.data = of({ paymentMethod });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.paymentMethod).toEqual(paymentMethod);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentMethod>>();
      const paymentMethod = { id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' };
      jest.spyOn(paymentMethodFormService, 'getPaymentMethod').mockReturnValue(paymentMethod);
      jest.spyOn(paymentMethodService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentMethod });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentMethod }));
      saveSubject.complete();

      // THEN
      expect(paymentMethodFormService.getPaymentMethod).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentMethodService.update).toHaveBeenCalledWith(expect.objectContaining(paymentMethod));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentMethod>>();
      const paymentMethod = { id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' };
      jest.spyOn(paymentMethodFormService, 'getPaymentMethod').mockReturnValue({ id: null });
      jest.spyOn(paymentMethodService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentMethod: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentMethod }));
      saveSubject.complete();

      // THEN
      expect(paymentMethodFormService.getPaymentMethod).toHaveBeenCalled();
      expect(paymentMethodService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentMethod>>();
      const paymentMethod = { id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' };
      jest.spyOn(paymentMethodService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentMethod });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentMethodService.update).toHaveBeenCalled();
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
