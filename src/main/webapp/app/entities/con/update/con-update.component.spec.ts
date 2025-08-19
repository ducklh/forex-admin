import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ConService } from '../service/con.service';
import { ICon } from '../con.model';
import { ConFormService } from './con-form.service';

import { ConUpdateComponent } from './con-update.component';

describe('Con Management Update Component', () => {
  let comp: ConUpdateComponent;
  let fixture: ComponentFixture<ConUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conFormService: ConFormService;
  let conService: ConService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConUpdateComponent],
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
      .overrideTemplate(ConUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conFormService = TestBed.inject(ConFormService);
    conService = TestBed.inject(ConService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const con: ICon = { id: '43b4c2f3-48b1-4d37-96b9-0fa888aafa43' };

      activatedRoute.data = of({ con });
      comp.ngOnInit();

      expect(comp.con).toEqual(con);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICon>>();
      const con = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
      jest.spyOn(conFormService, 'getCon').mockReturnValue(con);
      jest.spyOn(conService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ con });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: con }));
      saveSubject.complete();

      // THEN
      expect(conFormService.getCon).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conService.update).toHaveBeenCalledWith(expect.objectContaining(con));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICon>>();
      const con = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
      jest.spyOn(conFormService, 'getCon').mockReturnValue({ id: null });
      jest.spyOn(conService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ con: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: con }));
      saveSubject.complete();

      // THEN
      expect(conFormService.getCon).toHaveBeenCalled();
      expect(conService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICon>>();
      const con = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
      jest.spyOn(conService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ con });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
