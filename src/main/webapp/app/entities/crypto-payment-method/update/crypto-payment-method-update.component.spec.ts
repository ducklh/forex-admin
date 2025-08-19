import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CryptoPaymentMethodService } from '../service/crypto-payment-method.service';
import { ICryptoPaymentMethod } from '../crypto-payment-method.model';
import { CryptoPaymentMethodFormService } from './crypto-payment-method-form.service';

import { CryptoPaymentMethodUpdateComponent } from './crypto-payment-method-update.component';

describe('CryptoPaymentMethod Management Update Component', () => {
  let comp: CryptoPaymentMethodUpdateComponent;
  let fixture: ComponentFixture<CryptoPaymentMethodUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoPaymentMethodFormService: CryptoPaymentMethodFormService;
  let cryptoPaymentMethodService: CryptoPaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoPaymentMethodUpdateComponent],
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
      .overrideTemplate(CryptoPaymentMethodUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CryptoPaymentMethodUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cryptoPaymentMethodFormService = TestBed.inject(CryptoPaymentMethodFormService);
    cryptoPaymentMethodService = TestBed.inject(CryptoPaymentMethodService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cryptoPaymentMethod: ICryptoPaymentMethod = { id: '0d83b43f-0105-4ce5-8aad-e6dd6a145fc6' };

      activatedRoute.data = of({ cryptoPaymentMethod });
      comp.ngOnInit();

      expect(comp.cryptoPaymentMethod).toEqual(cryptoPaymentMethod);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPaymentMethod>>();
      const cryptoPaymentMethod = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
      jest.spyOn(cryptoPaymentMethodFormService, 'getCryptoPaymentMethod').mockReturnValue(cryptoPaymentMethod);
      jest.spyOn(cryptoPaymentMethodService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPaymentMethod });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoPaymentMethod }));
      saveSubject.complete();

      // THEN
      expect(cryptoPaymentMethodFormService.getCryptoPaymentMethod).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cryptoPaymentMethodService.update).toHaveBeenCalledWith(expect.objectContaining(cryptoPaymentMethod));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPaymentMethod>>();
      const cryptoPaymentMethod = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
      jest.spyOn(cryptoPaymentMethodFormService, 'getCryptoPaymentMethod').mockReturnValue({ id: null });
      jest.spyOn(cryptoPaymentMethodService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPaymentMethod: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoPaymentMethod }));
      saveSubject.complete();

      // THEN
      expect(cryptoPaymentMethodFormService.getCryptoPaymentMethod).toHaveBeenCalled();
      expect(cryptoPaymentMethodService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPaymentMethod>>();
      const cryptoPaymentMethod = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
      jest.spyOn(cryptoPaymentMethodService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPaymentMethod });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cryptoPaymentMethodService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
