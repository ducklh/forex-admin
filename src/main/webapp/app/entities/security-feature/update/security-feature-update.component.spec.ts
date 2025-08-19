import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SecurityFeatureService } from '../service/security-feature.service';
import { ISecurityFeature } from '../security-feature.model';
import { SecurityFeatureFormService } from './security-feature-form.service';

import { SecurityFeatureUpdateComponent } from './security-feature-update.component';

describe('SecurityFeature Management Update Component', () => {
  let comp: SecurityFeatureUpdateComponent;
  let fixture: ComponentFixture<SecurityFeatureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let securityFeatureFormService: SecurityFeatureFormService;
  let securityFeatureService: SecurityFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityFeatureUpdateComponent],
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
      .overrideTemplate(SecurityFeatureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecurityFeatureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    securityFeatureFormService = TestBed.inject(SecurityFeatureFormService);
    securityFeatureService = TestBed.inject(SecurityFeatureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const securityFeature: ISecurityFeature = { id: 'a4c13296-965d-4a9e-8bd6-d2e862c7f82e' };

      activatedRoute.data = of({ securityFeature });
      comp.ngOnInit();

      expect(comp.securityFeature).toEqual(securityFeature);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityFeature>>();
      const securityFeature = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
      jest.spyOn(securityFeatureFormService, 'getSecurityFeature').mockReturnValue(securityFeature);
      jest.spyOn(securityFeatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityFeature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityFeature }));
      saveSubject.complete();

      // THEN
      expect(securityFeatureFormService.getSecurityFeature).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(securityFeatureService.update).toHaveBeenCalledWith(expect.objectContaining(securityFeature));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityFeature>>();
      const securityFeature = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
      jest.spyOn(securityFeatureFormService, 'getSecurityFeature').mockReturnValue({ id: null });
      jest.spyOn(securityFeatureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityFeature: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: securityFeature }));
      saveSubject.complete();

      // THEN
      expect(securityFeatureFormService.getSecurityFeature).toHaveBeenCalled();
      expect(securityFeatureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISecurityFeature>>();
      const securityFeature = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
      jest.spyOn(securityFeatureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ securityFeature });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(securityFeatureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
