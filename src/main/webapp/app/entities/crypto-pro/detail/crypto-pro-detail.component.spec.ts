import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CryptoProDetailComponent } from './crypto-pro-detail.component';

describe('CryptoPro Management Detail Component', () => {
  let comp: CryptoProDetailComponent;
  let fixture: ComponentFixture<CryptoProDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoProDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./crypto-pro-detail.component').then(m => m.CryptoProDetailComponent),
              resolve: { cryptoPro: () => of({ id: 'd1f5fde7-7add-4950-b169-e65a199576e6' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CryptoProDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoProDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cryptoPro on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CryptoProDetailComponent);

      // THEN
      expect(instance.cryptoPro()).toEqual(expect.objectContaining({ id: 'd1f5fde7-7add-4950-b169-e65a199576e6' }));
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
