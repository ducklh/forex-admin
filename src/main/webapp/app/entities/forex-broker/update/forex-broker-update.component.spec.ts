import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IFeature } from 'app/entities/feature/feature.model';
import { FeatureService } from 'app/entities/feature/service/feature.service';
import { IPlatform } from 'app/entities/platform/platform.model';
import { PlatformService } from 'app/entities/platform/service/platform.service';
import { IInstrument } from 'app/entities/instrument/instrument.model';
import { InstrumentService } from 'app/entities/instrument/service/instrument.service';
import { IPro } from 'app/entities/pro/pro.model';
import { ProService } from 'app/entities/pro/service/pro.service';
import { ICon } from 'app/entities/con/con.model';
import { ConService } from 'app/entities/con/service/con.service';
import { ILanguageSupport } from 'app/entities/language-support/language-support.model';
import { LanguageSupportService } from 'app/entities/language-support/service/language-support.service';
import { ISupport } from 'app/entities/support/support.model';
import { SupportService } from 'app/entities/support/service/support.service';
import { IPaymentMethod } from 'app/entities/payment-method/payment-method.model';
import { PaymentMethodService } from 'app/entities/payment-method/service/payment-method.service';
import { IForexBroker } from '../forex-broker.model';
import { ForexBrokerService } from '../service/forex-broker.service';
import { ForexBrokerFormService } from './forex-broker-form.service';

import { ForexBrokerUpdateComponent } from './forex-broker-update.component';

describe('ForexBroker Management Update Component', () => {
  let comp: ForexBrokerUpdateComponent;
  let fixture: ComponentFixture<ForexBrokerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let forexBrokerFormService: ForexBrokerFormService;
  let forexBrokerService: ForexBrokerService;
  let featureService: FeatureService;
  let platformService: PlatformService;
  let instrumentService: InstrumentService;
  let proService: ProService;
  let conService: ConService;
  let languageSupportService: LanguageSupportService;
  let supportService: SupportService;
  let paymentMethodService: PaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForexBrokerUpdateComponent],
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
      .overrideTemplate(ForexBrokerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ForexBrokerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    forexBrokerFormService = TestBed.inject(ForexBrokerFormService);
    forexBrokerService = TestBed.inject(ForexBrokerService);
    featureService = TestBed.inject(FeatureService);
    platformService = TestBed.inject(PlatformService);
    instrumentService = TestBed.inject(InstrumentService);
    proService = TestBed.inject(ProService);
    conService = TestBed.inject(ConService);
    languageSupportService = TestBed.inject(LanguageSupportService);
    supportService = TestBed.inject(SupportService);
    paymentMethodService = TestBed.inject(PaymentMethodService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Feature query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexFeatures: IFeature[] = [{ id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' }];
      forexBroker.forexFeatures = forexFeatures;

      const featureCollection: IFeature[] = [{ id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' }];
      jest.spyOn(featureService, 'query').mockReturnValue(of(new HttpResponse({ body: featureCollection })));
      const additionalFeatures = [...forexFeatures];
      const expectedCollection: IFeature[] = [...additionalFeatures, ...featureCollection];
      jest.spyOn(featureService, 'addFeatureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(featureService.query).toHaveBeenCalled();
      expect(featureService.addFeatureToCollectionIfMissing).toHaveBeenCalledWith(
        featureCollection,
        ...additionalFeatures.map(expect.objectContaining),
      );
      expect(comp.featuresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Platform query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexPlatforms: IPlatform[] = [{ id: '2368b766-4eae-434c-b330-4997a5ab5113' }];
      forexBroker.forexPlatforms = forexPlatforms;

      const platformCollection: IPlatform[] = [{ id: '2368b766-4eae-434c-b330-4997a5ab5113' }];
      jest.spyOn(platformService, 'query').mockReturnValue(of(new HttpResponse({ body: platformCollection })));
      const additionalPlatforms = [...forexPlatforms];
      const expectedCollection: IPlatform[] = [...additionalPlatforms, ...platformCollection];
      jest.spyOn(platformService, 'addPlatformToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(platformService.query).toHaveBeenCalled();
      expect(platformService.addPlatformToCollectionIfMissing).toHaveBeenCalledWith(
        platformCollection,
        ...additionalPlatforms.map(expect.objectContaining),
      );
      expect(comp.platformsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Instrument query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexInstruments: IInstrument[] = [{ id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' }];
      forexBroker.forexInstruments = forexInstruments;

      const instrumentCollection: IInstrument[] = [{ id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' }];
      jest.spyOn(instrumentService, 'query').mockReturnValue(of(new HttpResponse({ body: instrumentCollection })));
      const additionalInstruments = [...forexInstruments];
      const expectedCollection: IInstrument[] = [...additionalInstruments, ...instrumentCollection];
      jest.spyOn(instrumentService, 'addInstrumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(instrumentService.query).toHaveBeenCalled();
      expect(instrumentService.addInstrumentToCollectionIfMissing).toHaveBeenCalledWith(
        instrumentCollection,
        ...additionalInstruments.map(expect.objectContaining),
      );
      expect(comp.instrumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Pro query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexPros: IPro[] = [{ id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' }];
      forexBroker.forexPros = forexPros;

      const proCollection: IPro[] = [{ id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' }];
      jest.spyOn(proService, 'query').mockReturnValue(of(new HttpResponse({ body: proCollection })));
      const additionalPros = [...forexPros];
      const expectedCollection: IPro[] = [...additionalPros, ...proCollection];
      jest.spyOn(proService, 'addProToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(proService.query).toHaveBeenCalled();
      expect(proService.addProToCollectionIfMissing).toHaveBeenCalledWith(proCollection, ...additionalPros.map(expect.objectContaining));
      expect(comp.prosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Con query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexCons: ICon[] = [{ id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' }];
      forexBroker.forexCons = forexCons;

      const conCollection: ICon[] = [{ id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' }];
      jest.spyOn(conService, 'query').mockReturnValue(of(new HttpResponse({ body: conCollection })));
      const additionalCons = [...forexCons];
      const expectedCollection: ICon[] = [...additionalCons, ...conCollection];
      jest.spyOn(conService, 'addConToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(conService.query).toHaveBeenCalled();
      expect(conService.addConToCollectionIfMissing).toHaveBeenCalledWith(conCollection, ...additionalCons.map(expect.objectContaining));
      expect(comp.consSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LanguageSupport query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexLanguages: ILanguageSupport[] = [{ id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' }];
      forexBroker.forexLanguages = forexLanguages;

      const languageSupportCollection: ILanguageSupport[] = [{ id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' }];
      jest.spyOn(languageSupportService, 'query').mockReturnValue(of(new HttpResponse({ body: languageSupportCollection })));
      const additionalLanguageSupports = [...forexLanguages];
      const expectedCollection: ILanguageSupport[] = [...additionalLanguageSupports, ...languageSupportCollection];
      jest.spyOn(languageSupportService, 'addLanguageSupportToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(languageSupportService.query).toHaveBeenCalled();
      expect(languageSupportService.addLanguageSupportToCollectionIfMissing).toHaveBeenCalledWith(
        languageSupportCollection,
        ...additionalLanguageSupports.map(expect.objectContaining),
      );
      expect(comp.languageSupportsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Support query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexSupports: ISupport[] = [{ id: '38fdd302-fdac-4991-a312-3b5f37ce007d' }];
      forexBroker.forexSupports = forexSupports;

      const supportCollection: ISupport[] = [{ id: '38fdd302-fdac-4991-a312-3b5f37ce007d' }];
      jest.spyOn(supportService, 'query').mockReturnValue(of(new HttpResponse({ body: supportCollection })));
      const additionalSupports = [...forexSupports];
      const expectedCollection: ISupport[] = [...additionalSupports, ...supportCollection];
      jest.spyOn(supportService, 'addSupportToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(supportService.query).toHaveBeenCalled();
      expect(supportService.addSupportToCollectionIfMissing).toHaveBeenCalledWith(
        supportCollection,
        ...additionalSupports.map(expect.objectContaining),
      );
      expect(comp.supportsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentMethod query and add missing value', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexPaymentMethods: IPaymentMethod[] = [{ id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' }];
      forexBroker.forexPaymentMethods = forexPaymentMethods;

      const paymentMethodCollection: IPaymentMethod[] = [{ id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' }];
      jest.spyOn(paymentMethodService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentMethodCollection })));
      const additionalPaymentMethods = [...forexPaymentMethods];
      const expectedCollection: IPaymentMethod[] = [...additionalPaymentMethods, ...paymentMethodCollection];
      jest.spyOn(paymentMethodService, 'addPaymentMethodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(paymentMethodService.query).toHaveBeenCalled();
      expect(paymentMethodService.addPaymentMethodToCollectionIfMissing).toHaveBeenCalledWith(
        paymentMethodCollection,
        ...additionalPaymentMethods.map(expect.objectContaining),
      );
      expect(comp.paymentMethodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const forexBroker: IForexBroker = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };
      const forexFeatures: IFeature = { id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' };
      forexBroker.forexFeatures = [forexFeatures];
      const forexPlatforms: IPlatform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      forexBroker.forexPlatforms = [forexPlatforms];
      const forexInstruments: IInstrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      forexBroker.forexInstruments = [forexInstruments];
      const forexPros: IPro = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
      forexBroker.forexPros = [forexPros];
      const forexCons: ICon = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
      forexBroker.forexCons = [forexCons];
      const forexLanguages: ILanguageSupport = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
      forexBroker.forexLanguages = [forexLanguages];
      const forexSupports: ISupport = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
      forexBroker.forexSupports = [forexSupports];
      const forexPaymentMethods: IPaymentMethod = { id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' };
      forexBroker.forexPaymentMethods = [forexPaymentMethods];

      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      expect(comp.featuresSharedCollection).toContainEqual(forexFeatures);
      expect(comp.platformsSharedCollection).toContainEqual(forexPlatforms);
      expect(comp.instrumentsSharedCollection).toContainEqual(forexInstruments);
      expect(comp.prosSharedCollection).toContainEqual(forexPros);
      expect(comp.consSharedCollection).toContainEqual(forexCons);
      expect(comp.languageSupportsSharedCollection).toContainEqual(forexLanguages);
      expect(comp.supportsSharedCollection).toContainEqual(forexSupports);
      expect(comp.paymentMethodsSharedCollection).toContainEqual(forexPaymentMethods);
      expect(comp.forexBroker).toEqual(forexBroker);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IForexBroker>>();
      const forexBroker = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
      jest.spyOn(forexBrokerFormService, 'getForexBroker').mockReturnValue(forexBroker);
      jest.spyOn(forexBrokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: forexBroker }));
      saveSubject.complete();

      // THEN
      expect(forexBrokerFormService.getForexBroker).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(forexBrokerService.update).toHaveBeenCalledWith(expect.objectContaining(forexBroker));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IForexBroker>>();
      const forexBroker = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
      jest.spyOn(forexBrokerFormService, 'getForexBroker').mockReturnValue({ id: null });
      jest.spyOn(forexBrokerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ forexBroker: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: forexBroker }));
      saveSubject.complete();

      // THEN
      expect(forexBrokerFormService.getForexBroker).toHaveBeenCalled();
      expect(forexBrokerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IForexBroker>>();
      const forexBroker = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
      jest.spyOn(forexBrokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ forexBroker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(forexBrokerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFeature', () => {
      it('Should forward to featureService', () => {
        const entity = { id: 'c9f6aa8f-47ba-4778-a4a6-6c9fc1697cb7' };
        const entity2 = { id: 'ba4d0840-41cd-4efd-ad24-9c999bab9ebb' };
        jest.spyOn(featureService, 'compareFeature');
        comp.compareFeature(entity, entity2);
        expect(featureService.compareFeature).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlatform', () => {
      it('Should forward to platformService', () => {
        const entity = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
        const entity2 = { id: 'adc9c792-7529-4e73-88ad-9faef0937c79' };
        jest.spyOn(platformService, 'comparePlatform');
        comp.comparePlatform(entity, entity2);
        expect(platformService.comparePlatform).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareInstrument', () => {
      it('Should forward to instrumentService', () => {
        const entity = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
        const entity2 = { id: '9f86699a-96ef-4bc7-a5bc-58e11e0359a6' };
        jest.spyOn(instrumentService, 'compareInstrument');
        comp.compareInstrument(entity, entity2);
        expect(instrumentService.compareInstrument).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePro', () => {
      it('Should forward to proService', () => {
        const entity = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
        const entity2 = { id: '51c2a82e-2882-4f42-828d-dd2e6ecb1706' };
        jest.spyOn(proService, 'comparePro');
        comp.comparePro(entity, entity2);
        expect(proService.comparePro).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCon', () => {
      it('Should forward to conService', () => {
        const entity = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
        const entity2 = { id: '43b4c2f3-48b1-4d37-96b9-0fa888aafa43' };
        jest.spyOn(conService, 'compareCon');
        comp.compareCon(entity, entity2);
        expect(conService.compareCon).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLanguageSupport', () => {
      it('Should forward to languageSupportService', () => {
        const entity = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
        const entity2 = { id: '27b0f6b1-b1e4-4479-a46f-4ec971d6a336' };
        jest.spyOn(languageSupportService, 'compareLanguageSupport');
        comp.compareLanguageSupport(entity, entity2);
        expect(languageSupportService.compareLanguageSupport).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSupport', () => {
      it('Should forward to supportService', () => {
        const entity = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
        const entity2 = { id: 'db11bf8a-9a0c-49c7-9ec8-a0a719eedaea' };
        jest.spyOn(supportService, 'compareSupport');
        comp.compareSupport(entity, entity2);
        expect(supportService.compareSupport).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePaymentMethod', () => {
      it('Should forward to paymentMethodService', () => {
        const entity = { id: 'c956e9ee-89c6-498e-94b9-cc7c3c6dfa79' };
        const entity2 = { id: '64f1e578-92ea-42c7-871a-a3cd58619324' };
        jest.spyOn(paymentMethodService, 'comparePaymentMethod');
        comp.comparePaymentMethod(entity, entity2);
        expect(paymentMethodService.comparePaymentMethod).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
