import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CryptoConService } from '../service/crypto-con.service';
import { ICryptoCon } from '../crypto-con.model';
import { CryptoConFormService } from './crypto-con-form.service';

import { CryptoConUpdateComponent } from './crypto-con-update.component';

describe('CryptoCon Management Update Component', () => {
  let comp: CryptoConUpdateComponent;
  let fixture: ComponentFixture<CryptoConUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoConFormService: CryptoConFormService;
  let cryptoConService: CryptoConService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoConUpdateComponent],
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
      .overrideTemplate(CryptoConUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CryptoConUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cryptoConFormService = TestBed.inject(CryptoConFormService);
    cryptoConService = TestBed.inject(CryptoConService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cryptoCon: ICryptoCon = { id: '4762ce79-df84-4fa7-a945-c12d85984b8f' };

      activatedRoute.data = of({ cryptoCon });
      comp.ngOnInit();

      expect(comp.cryptoCon).toEqual(cryptoCon);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoCon>>();
      const cryptoCon = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
      jest.spyOn(cryptoConFormService, 'getCryptoCon').mockReturnValue(cryptoCon);
      jest.spyOn(cryptoConService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoCon });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoCon }));
      saveSubject.complete();

      // THEN
      expect(cryptoConFormService.getCryptoCon).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cryptoConService.update).toHaveBeenCalledWith(expect.objectContaining(cryptoCon));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoCon>>();
      const cryptoCon = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
      jest.spyOn(cryptoConFormService, 'getCryptoCon').mockReturnValue({ id: null });
      jest.spyOn(cryptoConService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoCon: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoCon }));
      saveSubject.complete();

      // THEN
      expect(cryptoConFormService.getCryptoCon).toHaveBeenCalled();
      expect(cryptoConService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoCon>>();
      const cryptoCon = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
      jest.spyOn(cryptoConService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoCon });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cryptoConService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
