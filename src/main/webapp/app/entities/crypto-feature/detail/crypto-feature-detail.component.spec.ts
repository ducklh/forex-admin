import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CryptoFeatureDetailComponent } from './crypto-feature-detail.component';

describe('CryptoFeature Management Detail Component', () => {
  let comp: CryptoFeatureDetailComponent;
  let fixture: ComponentFixture<CryptoFeatureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFeatureDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./crypto-feature-detail.component').then(m => m.CryptoFeatureDetailComponent),
              resolve: { cryptoFeature: () => of({ id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CryptoFeatureDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoFeatureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cryptoFeature on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CryptoFeatureDetailComponent);

      // THEN
      expect(instance.cryptoFeature()).toEqual(expect.objectContaining({ id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' }));
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
