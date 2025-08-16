import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { InstrumentDetailComponent } from './instrument-detail.component';

describe('Instrument Management Detail Component', () => {
  let comp: InstrumentDetailComponent;
  let fixture: ComponentFixture<InstrumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./instrument-detail.component').then(m => m.InstrumentDetailComponent),
              resolve: { instrument: () => of({ id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(InstrumentDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load instrument on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', InstrumentDetailComponent);

      // THEN
      expect(instance.instrument()).toEqual(expect.objectContaining({ id: '28e7708d-b6d7-45a0-9272-8d2777ba9997' }));
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
