import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CryptoBrokerService } from '../service/crypto-broker.service';
import { ICryptoBroker } from '../crypto-broker.model';
import { CryptoBrokerFormService } from './crypto-broker-form.service';

import { CryptoBrokerUpdateComponent } from './crypto-broker-update.component';

describe('CryptoBroker Management Update Component', () => {
  let comp: CryptoBrokerUpdateComponent;
  let fixture: ComponentFixture<CryptoBrokerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoBrokerFormService: CryptoBrokerFormService;
  let cryptoBrokerService: CryptoBrokerService;

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

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cryptoBroker: ICryptoBroker = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };

      activatedRoute.data = of({ cryptoBroker });
      comp.ngOnInit();

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
});
