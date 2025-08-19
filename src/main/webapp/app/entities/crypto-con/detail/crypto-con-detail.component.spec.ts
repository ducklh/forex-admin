import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CryptoConDetailComponent } from './crypto-con-detail.component';

describe('CryptoCon Management Detail Component', () => {
  let comp: CryptoConDetailComponent;
  let fixture: ComponentFixture<CryptoConDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoConDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./crypto-con-detail.component').then(m => m.CryptoConDetailComponent),
              resolve: { cryptoCon: () => of({ id: '0c984349-ba43-4134-a6fb-760605f9acb1' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CryptoConDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoConDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cryptoCon on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CryptoConDetailComponent);

      // THEN
      expect(instance.cryptoCon()).toEqual(expect.objectContaining({ id: '0c984349-ba43-4134-a6fb-760605f9acb1' }));
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
