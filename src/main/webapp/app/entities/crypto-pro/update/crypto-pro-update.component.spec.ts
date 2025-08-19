import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CryptoProService } from '../service/crypto-pro.service';
import { ICryptoPro } from '../crypto-pro.model';
import { CryptoProFormService } from './crypto-pro-form.service';

import { CryptoProUpdateComponent } from './crypto-pro-update.component';

describe('CryptoPro Management Update Component', () => {
  let comp: CryptoProUpdateComponent;
  let fixture: ComponentFixture<CryptoProUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoProFormService: CryptoProFormService;
  let cryptoProService: CryptoProService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoProUpdateComponent],
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
      .overrideTemplate(CryptoProUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CryptoProUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cryptoProFormService = TestBed.inject(CryptoProFormService);
    cryptoProService = TestBed.inject(CryptoProService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cryptoPro: ICryptoPro = { id: '3fd53cf1-b6be-4d35-8e92-1b9662b97e99' };

      activatedRoute.data = of({ cryptoPro });
      comp.ngOnInit();

      expect(comp.cryptoPro).toEqual(cryptoPro);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPro>>();
      const cryptoPro = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
      jest.spyOn(cryptoProFormService, 'getCryptoPro').mockReturnValue(cryptoPro);
      jest.spyOn(cryptoProService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoPro }));
      saveSubject.complete();

      // THEN
      expect(cryptoProFormService.getCryptoPro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cryptoProService.update).toHaveBeenCalledWith(expect.objectContaining(cryptoPro));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPro>>();
      const cryptoPro = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
      jest.spyOn(cryptoProFormService, 'getCryptoPro').mockReturnValue({ id: null });
      jest.spyOn(cryptoProService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoPro }));
      saveSubject.complete();

      // THEN
      expect(cryptoProFormService.getCryptoPro).toHaveBeenCalled();
      expect(cryptoProService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoPro>>();
      const cryptoPro = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
      jest.spyOn(cryptoProService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoPro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cryptoProService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
