import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { RegulationDetailComponent } from './regulation-detail.component';

describe('Regulation Management Detail Component', () => {
  let comp: RegulationDetailComponent;
  let fixture: ComponentFixture<RegulationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulationDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./regulation-detail.component').then(m => m.RegulationDetailComponent),
              resolve: { regulation: () => of({ id: '1d26effb-5a95-4be5-b32c-5bc200340b30' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RegulationDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load regulation on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RegulationDetailComponent);

      // THEN
      expect(instance.regulation()).toEqual(expect.objectContaining({ id: '1d26effb-5a95-4be5-b32c-5bc200340b30' }));
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
