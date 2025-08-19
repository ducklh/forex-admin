import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { InstrumentService } from '../service/instrument.service';
import { IInstrument } from '../instrument.model';
import { InstrumentFormService } from './instrument-form.service';

import { InstrumentUpdateComponent } from './instrument-update.component';

describe('Instrument Management Update Component', () => {
  let comp: InstrumentUpdateComponent;
  let fixture: ComponentFixture<InstrumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let instrumentFormService: InstrumentFormService;
  let instrumentService: InstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InstrumentUpdateComponent],
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
      .overrideTemplate(InstrumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstrumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    instrumentFormService = TestBed.inject(InstrumentFormService);
    instrumentService = TestBed.inject(InstrumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const instrument: IInstrument = { id: '9f86699a-96ef-4bc7-a5bc-58e11e0359a6' };

      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      expect(comp.instrument).toEqual(instrument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentFormService, 'getInstrument').mockReturnValue(instrument);
      jest.spyOn(instrumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrument }));
      saveSubject.complete();

      // THEN
      expect(instrumentFormService.getInstrument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(instrumentService.update).toHaveBeenCalledWith(expect.objectContaining(instrument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentFormService, 'getInstrument').mockReturnValue({ id: null });
      jest.spyOn(instrumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrument }));
      saveSubject.complete();

      // THEN
      expect(instrumentFormService.getInstrument).toHaveBeenCalled();
      expect(instrumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstrument>>();
      const instrument = { id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' };
      jest.spyOn(instrumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(instrumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
