import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { FeatureService } from '../service/feature.service';
import { IFeature } from '../feature.model';
import { FeatureFormService } from './feature-form.service';

import { FeatureUpdateComponent } from './feature-update.component';

describe('Feature Management Update Component', () => {
  let comp: FeatureUpdateComponent;
  let fixture: ComponentFixture<FeatureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let featureFormService: FeatureFormService;
  let featureService: FeatureService;
  let brokerService: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeatureUpdateComponent],
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
      .overrideTemplate(FeatureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeatureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    featureFormService = TestBed.inject(FeatureFormService);
    featureService = TestBed.inject(FeatureService);
    brokerService = TestBed.inject(BrokerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Broker query and add missing value', () => {
      const feature: IFeature = { id: 'ba4d0840-41cd-4efd-ad24-9c999bab9ebb' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      feature.broker = broker;

      const brokerCollection: IBroker[] = [{ id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' }];
      jest.spyOn(brokerService, 'query').mockReturnValue(of(new HttpResponse({ body: brokerCollection })));
      const additionalBrokers = [broker];
      const expectedCollection: IBroker[] = [...additionalBrokers, ...brokerCollection];
      jest.spyOn(brokerService, 'addBrokerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feature });
      comp.ngOnInit();

      expect(brokerService.query).toHaveBeenCalled();
      expect(brokerService.addBrokerToCollectionIfMissing).toHaveBeenCalledWith(
        brokerCollection,
        ...additionalBrokers.map(expect.objectContaining),
      );
      expect(comp.brokersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const feature: IFeature = { id: 'ba4d0840-41cd-4efd-ad24-9c999bab9ebb' };
      const broker: IBroker = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
      feature.broker = broker;

      activatedRoute.data = of({ feature });
      comp.ngOnInit();

      expect(comp.brokersSharedCollection).toContainEqual(broker);
      expect(comp.feature).toEqual(feature);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeature>>();
      const feature = { id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' };
      jest.spyOn(featureFormService, 'getFeature').mockReturnValue(feature);
      jest.spyOn(featureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feature }));
      saveSubject.complete();

      // THEN
      expect(featureFormService.getFeature).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(featureService.update).toHaveBeenCalledWith(expect.objectContaining(feature));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeature>>();
      const feature = { id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' };
      jest.spyOn(featureFormService, 'getFeature').mockReturnValue({ id: null });
      jest.spyOn(featureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feature: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feature }));
      saveSubject.complete();

      // THEN
      expect(featureFormService.getFeature).toHaveBeenCalled();
      expect(featureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeature>>();
      const feature = { id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' };
      jest.spyOn(featureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(featureService.update).toHaveBeenCalled();
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
