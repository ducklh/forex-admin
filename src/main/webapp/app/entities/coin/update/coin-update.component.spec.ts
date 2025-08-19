import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CoinService } from '../service/coin.service';
import { ICoin } from '../coin.model';
import { CoinFormService } from './coin-form.service';

import { CoinUpdateComponent } from './coin-update.component';

describe('Coin Management Update Component', () => {
  let comp: CoinUpdateComponent;
  let fixture: ComponentFixture<CoinUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let coinFormService: CoinFormService;
  let coinService: CoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinUpdateComponent],
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
      .overrideTemplate(CoinUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CoinUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    coinFormService = TestBed.inject(CoinFormService);
    coinService = TestBed.inject(CoinService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const coin: ICoin = { id: 'd9aa5557-77d7-41d3-b809-5ad07ff6d746' };

      activatedRoute.data = of({ coin });
      comp.ngOnInit();

      expect(comp.coin).toEqual(coin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICoin>>();
      const coin = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
      jest.spyOn(coinFormService, 'getCoin').mockReturnValue(coin);
      jest.spyOn(coinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: coin }));
      saveSubject.complete();

      // THEN
      expect(coinFormService.getCoin).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(coinService.update).toHaveBeenCalledWith(expect.objectContaining(coin));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICoin>>();
      const coin = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
      jest.spyOn(coinFormService, 'getCoin').mockReturnValue({ id: null });
      jest.spyOn(coinService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coin: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: coin }));
      saveSubject.complete();

      // THEN
      expect(coinFormService.getCoin).toHaveBeenCalled();
      expect(coinService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICoin>>();
      const coin = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
      jest.spyOn(coinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(coinService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
