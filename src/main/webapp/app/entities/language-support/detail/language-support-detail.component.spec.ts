import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LanguageSupportDetailComponent } from './language-support-detail.component';

describe('LanguageSupport Management Detail Component', () => {
  let comp: LanguageSupportDetailComponent;
  let fixture: ComponentFixture<LanguageSupportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSupportDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./language-support-detail.component').then(m => m.LanguageSupportDetailComponent),
              resolve: { languageSupport: () => of({ id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LanguageSupportDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSupportDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load languageSupport on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LanguageSupportDetailComponent);

      // THEN
      expect(instance.languageSupport()).toEqual(expect.objectContaining({ id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' }));
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
