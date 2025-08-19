import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CryptoPaymentMethodDetailComponent } from './crypto-payment-method-detail.component';

describe('CryptoPaymentMethod Management Detail Component', () => {
  let comp: CryptoPaymentMethodDetailComponent;
  let fixture: ComponentFixture<CryptoPaymentMethodDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoPaymentMethodDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./crypto-payment-method-detail.component').then(m => m.CryptoPaymentMethodDetailComponent),
              resolve: { cryptoPaymentMethod: () => of({ id: '4cda1e88-7339-40e9-ad09-0759e7964628' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CryptoPaymentMethodDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoPaymentMethodDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cryptoPaymentMethod on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CryptoPaymentMethodDetailComponent);

      // THEN
      expect(instance.cryptoPaymentMethod()).toEqual(expect.objectContaining({ id: '4cda1e88-7339-40e9-ad09-0759e7964628' }));
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
