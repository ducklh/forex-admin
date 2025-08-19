import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CoinDetailComponent } from './coin-detail.component';

describe('Coin Management Detail Component', () => {
  let comp: CoinDetailComponent;
  let fixture: ComponentFixture<CoinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./coin-detail.component').then(m => m.CoinDetailComponent),
              resolve: { coin: () => of({ id: '64f7186a-27f9-4553-9d40-693947555dad' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CoinDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load coin on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CoinDetailComponent);

      // THEN
      expect(instance.coin()).toEqual(expect.objectContaining({ id: '64f7186a-27f9-4553-9d40-693947555dad' }));
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
