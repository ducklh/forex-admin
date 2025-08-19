import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { PlatformService } from '../service/platform.service';
import { IPlatform } from '../platform.model';
import { PlatformFormService } from './platform-form.service';

import { PlatformUpdateComponent } from './platform-update.component';

describe('Platform Management Update Component', () => {
  let comp: PlatformUpdateComponent;
  let fixture: ComponentFixture<PlatformUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let platformFormService: PlatformFormService;
  let platformService: PlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlatformUpdateComponent],
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
      .overrideTemplate(PlatformUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlatformUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    platformFormService = TestBed.inject(PlatformFormService);
    platformService = TestBed.inject(PlatformService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const platform: IPlatform = { id: 'adc9c792-7529-4e73-88ad-9faef0937c79' };

      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      expect(comp.platform).toEqual(platform);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformFormService, 'getPlatform').mockReturnValue(platform);
      jest.spyOn(platformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: platform }));
      saveSubject.complete();

      // THEN
      expect(platformFormService.getPlatform).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(platformService.update).toHaveBeenCalledWith(expect.objectContaining(platform));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformFormService, 'getPlatform').mockReturnValue({ id: null });
      jest.spyOn(platformService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: platform }));
      saveSubject.complete();

      // THEN
      expect(platformFormService.getPlatform).toHaveBeenCalled();
      expect(platformService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlatform>>();
      const platform = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
      jest.spyOn(platformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ platform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(platformService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
