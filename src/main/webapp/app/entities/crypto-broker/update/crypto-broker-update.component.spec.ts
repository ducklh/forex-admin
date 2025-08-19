import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICryptoFeature } from 'app/entities/crypto-feature/crypto-feature.model';
import { CryptoFeatureService } from 'app/entities/crypto-feature/service/crypto-feature.service';
import { ICoin } from 'app/entities/coin/coin.model';
import { CoinService } from 'app/entities/coin/service/coin.service';
import { ICryptoPro } from 'app/entities/crypto-pro/crypto-pro.model';
import { CryptoProService } from 'app/entities/crypto-pro/service/crypto-pro.service';
import { ICryptoCon } from 'app/entities/crypto-con/crypto-con.model';
import { CryptoConService } from 'app/entities/crypto-con/service/crypto-con.service';
import { ISecurityFeature } from 'app/entities/security-feature/security-feature.model';
import { SecurityFeatureService } from 'app/entities/security-feature/service/security-feature.service';
import { ICryptoPaymentMethod } from 'app/entities/crypto-payment-method/crypto-payment-method.model';
import { CryptoPaymentMethodService } from 'app/entities/crypto-payment-method/service/crypto-payment-method.service';
import { ICustomerSupport } from 'app/entities/customer-support/customer-support.model';
import { CustomerSupportService } from 'app/entities/customer-support/service/customer-support.service';
import { ICryptoBroker } from '../crypto-broker.model';
import { CryptoBrokerService } from '../service/crypto-broker.service';
import { CryptoBrokerFormService } from './crypto-broker-form.service';

import { CryptoBrokerUpdateComponent } from './crypto-broker-update.component';

describe('CryptoBroker Management Update Component', () => {
  let comp: CryptoBrokerUpdateComponent;
  let fixture: ComponentFixture<CryptoBrokerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoBrokerFormService: CryptoBrokerFormService;
  let cryptoBrokerService: CryptoBrokerService;
  let cryptoFeatureService: CryptoFeatureService;
  let coinService: CoinService;
  let cryptoProService: CryptoProService;
  let cryptoConService: CryptoConService;
  let securityFeatureService: SecurityFeatureService;
  let cryptoPaymentMethodService: CryptoPaymentMethodService;
  let customerSupportService: CustomerSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoBrokerUpdateComponent],
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
      .overrideTemplate(CryptoBrokerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CryptoBrokerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cryptoBrokerFormService = TestBed.inject(CryptoBrokerFormService);
    cryptoBrokerService = TestBed.inject(CryptoBrokerService);
    cryptoFeatureService = TestBed.inject(CryptoFeatureService);
    coinService = TestBed.inject(CoinService);
    cryptoProService = TestBed.inject(CryptoProService);
    cryptoConService = TestBed.inject(CryptoConService);
    securityFeatureService = TestBed.inject(SecurityFeatureService);
    cryptoPaymentMethodService = TestBed.inject(CryptoPaymentMethodService);
    customerSupportService = TestBed.inject(CustomerSupportService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CryptoFeature query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const cryptoFeatures: ICryptoFeature[] = [{ id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' }];
      cryptoBroker.cryptoFeatures = cryptoFeatures;

      const cryptoFeatureCollection: ICryptoFeature[] = [{ id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' }];
      jest.spyOn(cryptoFeatureService, 'query').mockReturnValue(of(new HttpResponse({ body: cryptoFeatureCollection })));
      const additionalCryptoFeatures = [...cryptoFeatures];
      const expectedCollection: ICryptoFeature[] = [...additionalCryptoFeatures, ...cryptoFeatureCollection];
      jest.spyOn(cryptoFeatureService, 'addCryptoFeatureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(cryptoFeatureService.query).toHaveBeenCalled();
      expect(cryptoFeatureService.addCryptoFeatureToCollectionIfMissing).toHaveBeenCalledWith(
        cryptoFeatureCollection,
        ...additionalCryptoFeatures.map(expect.objectContaining),
      );
      expect(comp.cryptoFeaturesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Coin query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const supportedCoins: ICoin[] = [{ id: '64f7186a-27f9-4553-9d40-693947555dad' }];
      cryptoBroker.supportedCoins = supportedCoins;

      const coinCollection: ICoin[] = [{ id: '64f7186a-27f9-4553-9d40-693947555dad' }];
      jest.spyOn(coinService, 'query').mockReturnValue(of(new HttpResponse({ body: coinCollection })));
      const additionalCoins = [...supportedCoins];
      const expectedCollection: ICoin[] = [...additionalCoins, ...coinCollection];
      jest.spyOn(coinService, 'addCoinToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(coinService.query).toHaveBeenCalled();
      expect(coinService.addCoinToCollectionIfMissing).toHaveBeenCalledWith(
        coinCollection,
        ...additionalCoins.map(expect.objectContaining),
      );
      expect(comp.coinsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CryptoPro query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const cryptoPros: ICryptoPro[] = [{ id: 'd1f5fde7-7add-4950-b169-e65a199576e6' }];
      cryptoBroker.cryptoPros = cryptoPros;

      const cryptoProCollection: ICryptoPro[] = [{ id: 'd1f5fde7-7add-4950-b169-e65a199576e6' }];
      jest.spyOn(cryptoProService, 'query').mockReturnValue(of(new HttpResponse({ body: cryptoProCollection })));
      const additionalCryptoPros = [...cryptoPros];
      const expectedCollection: ICryptoPro[] = [...additionalCryptoPros, ...cryptoProCollection];
      jest.spyOn(cryptoProService, 'addCryptoProToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(cryptoProService.query).toHaveBeenCalled();
      expect(cryptoProService.addCryptoProToCollectionIfMissing).toHaveBeenCalledWith(
        cryptoProCollection,
        ...additionalCryptoPros.map(expect.objectContaining),
      );
      expect(comp.cryptoProsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CryptoCon query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const cryptoCons: ICryptoCon[] = [{ id: '0c984349-ba43-4134-a6fb-760605f9acb1' }];
      cryptoBroker.cryptoCons = cryptoCons;

      const cryptoConCollection: ICryptoCon[] = [{ id: '0c984349-ba43-4134-a6fb-760605f9acb1' }];
      jest.spyOn(cryptoConService, 'query').mockReturnValue(of(new HttpResponse({ body: cryptoConCollection })));
      const additionalCryptoCons = [...cryptoCons];
      const expectedCollection: ICryptoCon[] = [...additionalCryptoCons, ...cryptoConCollection];
      jest.spyOn(cryptoConService, 'addCryptoConToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(cryptoConService.query).toHaveBeenCalled();
      expect(cryptoConService.addCryptoConToCollectionIfMissing).toHaveBeenCalledWith(
        cryptoConCollection,
        ...additionalCryptoCons.map(expect.objectContaining),
      );
      expect(comp.cryptoConsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityFeature query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const securityFeatures: ISecurityFeature[] = [{ id: '4e413771-c7d3-4014-b303-c4386d933f82' }];
      cryptoBroker.securityFeatures = securityFeatures;

      const securityFeatureCollection: ISecurityFeature[] = [{ id: '4e413771-c7d3-4014-b303-c4386d933f82' }];
      jest.spyOn(securityFeatureService, 'query').mockReturnValue(of(new HttpResponse({ body: securityFeatureCollection })));
      const additionalSecurityFeatures = [...securityFeatures];
      const expectedCollection: ISecurityFeature[] = [...additionalSecurityFeatures, ...securityFeatureCollection];
      jest.spyOn(securityFeatureService, 'addSecurityFeatureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(securityFeatureService.query).toHaveBeenCalled();
      expect(securityFeatureService.addSecurityFeatureToCollectionIfMissing).toHaveBeenCalledWith(
        securityFeatureCollection,
        ...additionalSecurityFeatures.map(expect.objectContaining),
      );
      expect(comp.securityFeaturesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CryptoPaymentMethod query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const paymentMethods: ICryptoPaymentMethod[] = [{ id: '4cda1e88-7339-40e9-ad09-0759e7964628' }];
      cryptoBroker.paymentMethods = paymentMethods;

      const cryptoPaymentMethodCollection: ICryptoPaymentMethod[] = [{ id: '4cda1e88-7339-40e9-ad09-0759e7964628' }];
      jest.spyOn(cryptoPaymentMethodService, 'query').mockReturnValue(of(new HttpResponse({ body: cryptoPaymentMethodCollection })));
      const additionalCryptoPaymentMethods = [...paymentMethods];
      const expectedCollection: ICryptoPaymentMethod[] = [...additionalCryptoPaymentMethods, ...cryptoPaymentMethodCollection];
      jest.spyOn(cryptoPaymentMethodService, 'addCryptoPaymentMethodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(cryptoPaymentMethodService.query).toHaveBeenCalled();
      expect(cryptoPaymentMethodService.addCryptoPaymentMethodToCollectionIfMissing).toHaveBeenCalledWith(
        cryptoPaymentMethodCollection,
        ...additionalCryptoPaymentMethods.map(expect.objectContaining),
      );
      expect(comp.cryptoPaymentMethodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CustomerSupport query and add missing value', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const customerSupports: ICustomerSupport[] = [{ id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' }];
      cryptoBroker.customerSupports = customerSupports;

      const customerSupportCollection: ICustomerSupport[] = [{ id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' }];
      jest.spyOn(customerSupportService, 'query').mockReturnValue(of(new HttpResponse({ body: customerSupportCollection })));
      const additionalCustomerSupports = [...customerSupports];
      const expectedCollection: ICustomerSupport[] = [...additionalCustomerSupports, ...customerSupportCollection];
      jest.spyOn(customerSupportService, 'addCustomerSupportToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(customerSupportService.query).toHaveBeenCalled();
      expect(customerSupportService.addCustomerSupportToCollectionIfMissing).toHaveBeenCalledWith(
        customerSupportCollection,
        ...additionalCustomerSupports.map(expect.objectContaining),
      );
      expect(comp.customerSupportsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };
      const cryptoFeatures: ICryptoFeature = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
      cryptoBroker.cryptoFeatures = [cryptoFeatures];
      const supportedCoins: ICoin = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
      cryptoBroker.supportedCoins = [supportedCoins];
      const cryptoPros: ICryptoPro = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
      cryptoBroker.cryptoPros = [cryptoPros];
      const cryptoCons: ICryptoCon = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
      cryptoBroker.cryptoCons = [cryptoCons];
      const securityFeatures: ISecurityFeature = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
      cryptoBroker.securityFeatures = [securityFeatures];
      const paymentMethods: ICryptoPaymentMethod = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
      cryptoBroker.paymentMethods = [paymentMethods];
      const customerSupports: ICustomerSupport = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
      cryptoBroker.customerSupports = [customerSupports];

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      expect(comp.cryptoFeaturesSharedCollection).toContainEqual(cryptoFeatures);
      expect(comp.coinsSharedCollection).toContainEqual(supportedCoins);
      expect(comp.cryptoProsSharedCollection).toContainEqual(cryptoPros);
      expect(comp.cryptoConsSharedCollection).toContainEqual(cryptoCons);
      expect(comp.securityFeaturesSharedCollection).toContainEqual(securityFeatures);
      expect(comp.cryptoPaymentMethodsSharedCollection).toContainEqual(paymentMethods);
      expect(comp.customerSupportsSharedCollection).toContainEqual(customerSupports);
      expect(comp.cryptoBroker).toEqual(cryptoBroker);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoBroker>>();
      const cryptoBroker = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
      jest.spyOn(cryptoBrokerFormService, 'getCryptoBroker').mockReturnValue(cryptoBroker);
      jest.spyOn(cryptoBrokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoBroker }));
      saveSubject.complete();

      // THEN
      expect(cryptoBrokerFormService.getCryptoBroker).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cryptoBrokerService.update).toHaveBeenCalledWith(expect.objectContaining(cryptoBroker));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoBroker>>();
      const cryptoBroker = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
      jest.spyOn(cryptoBrokerFormService, 'getCryptoBroker').mockReturnValue({ id: null });
      jest.spyOn(cryptoBrokerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoBroker: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoBroker }));
      saveSubject.complete();

      // THEN
      expect(cryptoBrokerFormService.getCryptoBroker).toHaveBeenCalled();
      expect(cryptoBrokerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoBroker>>();
      const cryptoBroker = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
      jest.spyOn(cryptoBrokerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cryptoBrokerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCryptoFeature', () => {
      it('Should forward to cryptoFeatureService', () => {
        const entity = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
        const entity2 = { id: 'a38f2c9f-1bdd-4ddd-b744-d70a12eea5a8' };
        jest.spyOn(cryptoFeatureService, 'compareCryptoFeature');
        comp.compareCryptoFeature(entity, entity2);
        expect(cryptoFeatureService.compareCryptoFeature).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCoin', () => {
      it('Should forward to coinService', () => {
        const entity = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
        const entity2 = { id: 'd9aa5557-77d7-41d3-b809-5ad07ff6d746' };
        jest.spyOn(coinService, 'compareCoin');
        comp.compareCoin(entity, entity2);
        expect(coinService.compareCoin).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCryptoPro', () => {
      it('Should forward to cryptoProService', () => {
        const entity = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
        const entity2 = { id: '3fd53cf1-b6be-4d35-8e92-1b9662b97e99' };
        jest.spyOn(cryptoProService, 'compareCryptoPro');
        comp.compareCryptoPro(entity, entity2);
        expect(cryptoProService.compareCryptoPro).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCryptoCon', () => {
      it('Should forward to cryptoConService', () => {
        const entity = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
        const entity2 = { id: '4762ce79-df84-4fa7-a945-c12d85984b8f' };
        jest.spyOn(cryptoConService, 'compareCryptoCon');
        comp.compareCryptoCon(entity, entity2);
        expect(cryptoConService.compareCryptoCon).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSecurityFeature', () => {
      it('Should forward to securityFeatureService', () => {
        const entity = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
        const entity2 = { id: 'a4c13296-965d-4a9e-8bd6-d2e862c7f82e' };
        jest.spyOn(securityFeatureService, 'compareSecurityFeature');
        comp.compareSecurityFeature(entity, entity2);
        expect(securityFeatureService.compareSecurityFeature).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCryptoPaymentMethod', () => {
      it('Should forward to cryptoPaymentMethodService', () => {
        const entity = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
        const entity2 = { id: '0d83b43f-0105-4ce5-8aad-e6dd6a145fc6' };
        jest.spyOn(cryptoPaymentMethodService, 'compareCryptoPaymentMethod');
        comp.compareCryptoPaymentMethod(entity, entity2);
        expect(cryptoPaymentMethodService.compareCryptoPaymentMethod).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCustomerSupport', () => {
      it('Should forward to customerSupportService', () => {
        const entity = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
        const entity2 = { id: 'db4d48c3-79f7-4673-a5cf-694630d2ff2e' };
        jest.spyOn(customerSupportService, 'compareCustomerSupport');
        comp.compareCustomerSupport(entity, entity2);
        expect(customerSupportService.compareCustomerSupport).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
