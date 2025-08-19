import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ProService } from '../service/pro.service';
import { IPro } from '../pro.model';
import { ProFormService } from './pro-form.service';

import { ProUpdateComponent } from './pro-update.component';

describe('Pro Management Update Component', () => {
  let comp: ProUpdateComponent;
  let fixture: ComponentFixture<ProUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let proFormService: ProFormService;
  let proService: ProService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProUpdateComponent],
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
      .overrideTemplate(ProUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    proFormService = TestBed.inject(ProFormService);
    proService = TestBed.inject(ProService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pro: IPro = { id: '51c2a82e-2882-4f42-828d-dd2e6ecb1706' };

      activatedRoute.data = of({ pro });
      comp.ngOnInit();

      expect(comp.pro).toEqual(pro);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPro>>();
      const pro = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
      jest.spyOn(proFormService, 'getPro').mockReturnValue(pro);
      jest.spyOn(proService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pro }));
      saveSubject.complete();

      // THEN
      expect(proFormService.getPro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(proService.update).toHaveBeenCalledWith(expect.objectContaining(pro));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPro>>();
      const pro = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
      jest.spyOn(proFormService, 'getPro').mockReturnValue({ id: null });
      jest.spyOn(proService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pro }));
      saveSubject.complete();

      // THEN
      expect(proFormService.getPro).toHaveBeenCalled();
      expect(proService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPro>>();
      const pro = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
      jest.spyOn(proService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(proService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
