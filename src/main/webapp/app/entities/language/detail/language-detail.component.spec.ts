import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LanguageDetailComponent } from './language-detail.component';

describe('Language Management Detail Component', () => {
  let comp: LanguageDetailComponent;
  let fixture: ComponentFixture<LanguageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./language-detail.component').then(m => m.LanguageDetailComponent),
              resolve: { language: () => of({ id: 'dfa92605-e7fd-4e21-9d6b-b3a610f8169d' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LanguageDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load language on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LanguageDetailComponent);

      // THEN
      expect(instance.language()).toEqual(expect.objectContaining({ id: 'dfa92605-e7fd-4e21-9d6b-b3a610f8169d' }));
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
