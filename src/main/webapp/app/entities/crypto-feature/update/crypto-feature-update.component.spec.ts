import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CryptoFeatureService } from '../service/crypto-feature.service';
import { ICryptoFeature } from '../crypto-feature.model';
import { CryptoFeatureFormService } from './crypto-feature-form.service';

import { CryptoFeatureUpdateComponent } from './crypto-feature-update.component';

describe('CryptoFeature Management Update Component', () => {
  let comp: CryptoFeatureUpdateComponent;
  let fixture: ComponentFixture<CryptoFeatureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cryptoFeatureFormService: CryptoFeatureFormService;
  let cryptoFeatureService: CryptoFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoFeatureUpdateComponent],
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
      .overrideTemplate(CryptoFeatureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CryptoFeatureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cryptoFeatureFormService = TestBed.inject(CryptoFeatureFormService);
    cryptoFeatureService = TestBed.inject(CryptoFeatureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cryptoFeature: ICryptoFeature = { id: 'a38f2c9f-1bdd-4ddd-b744-d70a12eea5a8' };

      activatedRoute.data = of({ cryptoFeature });
      comp.ngOnInit();

      expect(comp.cryptoFeature).toEqual(cryptoFeature);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoFeature>>();
      const cryptoFeature = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
      jest.spyOn(cryptoFeatureFormService, 'getCryptoFeature').mockReturnValue(cryptoFeature);
      jest.spyOn(cryptoFeatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoFeature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoFeature }));
      saveSubject.complete();

      // THEN
      expect(cryptoFeatureFormService.getCryptoFeature).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cryptoFeatureService.update).toHaveBeenCalledWith(expect.objectContaining(cryptoFeature));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoFeature>>();
      const cryptoFeature = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
      jest.spyOn(cryptoFeatureFormService, 'getCryptoFeature').mockReturnValue({ id: null });
      jest.spyOn(cryptoFeatureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoFeature: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cryptoFeature }));
      saveSubject.complete();

      // THEN
      expect(cryptoFeatureFormService.getCryptoFeature).toHaveBeenCalled();
      expect(cryptoFeatureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICryptoFeature>>();
      const cryptoFeature = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
      jest.spyOn(cryptoFeatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cryptoFeature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cryptoFeatureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
