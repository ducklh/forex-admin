import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CustomerSupportService } from '../service/customer-support.service';
import { ICustomerSupport } from '../customer-support.model';
import { CustomerSupportFormService } from './customer-support-form.service';

import { CustomerSupportUpdateComponent } from './customer-support-update.component';

describe('CustomerSupport Management Update Component', () => {
  let comp: CustomerSupportUpdateComponent;
  let fixture: ComponentFixture<CustomerSupportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerSupportFormService: CustomerSupportFormService;
  let customerSupportService: CustomerSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomerSupportUpdateComponent],
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
      .overrideTemplate(CustomerSupportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerSupportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerSupportFormService = TestBed.inject(CustomerSupportFormService);
    customerSupportService = TestBed.inject(CustomerSupportService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customerSupport: ICustomerSupport = { id: 'db4d48c3-79f7-4673-a5cf-694630d2ff2e' };

      activatedRoute.data = of({ customerSupport });
      comp.ngOnInit();

      expect(comp.customerSupport).toEqual(customerSupport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerSupport>>();
      const customerSupport = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
      jest.spyOn(customerSupportFormService, 'getCustomerSupport').mockReturnValue(customerSupport);
      jest.spyOn(customerSupportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerSupport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerSupport }));
      saveSubject.complete();

      // THEN
      expect(customerSupportFormService.getCustomerSupport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerSupportService.update).toHaveBeenCalledWith(expect.objectContaining(customerSupport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerSupport>>();
      const customerSupport = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
      jest.spyOn(customerSupportFormService, 'getCustomerSupport').mockReturnValue({ id: null });
      jest.spyOn(customerSupportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerSupport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerSupport }));
      saveSubject.complete();

      // THEN
      expect(customerSupportFormService.getCustomerSupport).toHaveBeenCalled();
      expect(customerSupportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerSupport>>();
      const customerSupport = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
      jest.spyOn(customerSupportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerSupport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerSupportService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
