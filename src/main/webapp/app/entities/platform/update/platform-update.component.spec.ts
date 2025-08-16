import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { PlatformService } from '../service/platform.service';
import { IPlatform } from '../platform.model';
import { PlatformFormService } from './platform-form.service';

import { PlatformUpdateComponent } from './platform-update.component';

describe('Platform Management Update Component', () => {
  let comp: PlatformUpdateComponent;
  let fixture: ComponentFixture<PlatformUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let platformFormService: PlatformFormService;
  let platformService: PlatformService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlatformUpdateComponent],
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
      .overrideTemplate(PlatformUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlatformUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    platformFormService = TestBed.inject(PlatformFormService);
    platformService = TestBed.inject(PlatformService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const platform: IPlatform = { id: 'adc9c792-7529-4e73-88ad-9faef0937c79' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      platform.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const platform: IPlatform = { id: 'adc9c792-7529-4e73-88ad-9faef0937c79' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      platform.broker = broker;

      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.platform).toEqual(platform);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformFormService, 'getPlatform').mockReturnValue(platform);
      jest.spyOn(platformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: platform }));
      saveSubject.complete();

      // THEN
      expect(platformFormService.getPlatform).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(platformService.update).toHaveBeenCalledWith(expect.objectContaining(platform));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformFormService, 'getPlatform').mockReturnValue({ id: null });
      jest.spyOn(platformService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: platform }));
      saveSubject.complete();

      // THEN
      expect(platformFormService.getPlatform).toHaveBeenCalled();
      expect(platformService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(platformService.update).toHaveBeenCalled();
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
