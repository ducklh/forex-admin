import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { BrokerService } from '../service/broker.service';
import { IBroker } from '../broker.model';
import { BrokerFormService } from './broker-form.service';

import { BrokerUpdateComponent } from './broker-update.component';

describe('Broker Management Update Component', () => {
  let comp: BrokerUpdateComponent;
  let fixture: ComponentFixture<BrokerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let brokerFormService: BrokerFormService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrokerUpdateComponent],
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
      .overrideTemplate(BrokerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BrokerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    brokerFormService = TestBed.inject(BrokerFormService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const broker: IBroker = { id: '71abe793-642a-4ca6-a811-2bf9b91fef05' };

      activatedRoute.data = of({ broker });
      comp.ngOnInit();

      expect(comp.broker).toEqual(broker);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBroker>>();
      const broker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      jest.spyOn(brokerFormService, 'getBroker').mockReturnValue(broker);
      jest.spyOn(brokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ broker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: broker }));
      saveSubject.complete();

      // THEN
      expect(brokerFormService.getBroker).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(brokerService.update).toHaveBeenCalledWith(expect.objectContaining(broker));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBroker>>();
      const broker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      jest.spyOn(brokerFormService, 'getBroker').mockReturnValue({ id: null });
      jest.spyOn(brokerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ broker: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: broker }));
      saveSubject.complete();

      // THEN
      expect(brokerFormService.getBroker).toHaveBeenCalled();
      expect(brokerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBroker>>();
      const broker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      jest.spyOn(brokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ broker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(brokerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
