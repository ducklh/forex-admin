import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CustomerSupportDetailComponent } from './customer-support-detail.component';

describe('CustomerSupport Management Detail Component', () => {
  let comp: CustomerSupportDetailComponent;
  let fixture: ComponentFixture<CustomerSupportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSupportDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./customer-support-detail.component').then(m => m.CustomerSupportDetailComponent),
              resolve: { customerSupport: () => of({ id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CustomerSupportDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load customerSupport on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CustomerSupportDetailComponent);

      // THEN
      expect(instance.customerSupport()).toEqual(expect.objectContaining({ id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
