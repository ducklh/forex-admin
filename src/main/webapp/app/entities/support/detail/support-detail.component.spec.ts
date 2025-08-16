import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SupportDetailComponent } from './support-detail.component';

describe('Support Management Detail Component', () => {
  let comp: SupportDetailComponent;
  let fixture: ComponentFixture<SupportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./support-detail.component').then(m => m.SupportDetailComponent),
              resolve: { support: () => of({ id: '38fdd302-fdac-4991-a312-3b5f37ce007d' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SupportDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load support on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SupportDetailComponent);

      // THEN
      expect(instance.support()).toEqual(expect.objectContaining({ id: '38fdd302-fdac-4991-a312-3b5f37ce007d' }));
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
