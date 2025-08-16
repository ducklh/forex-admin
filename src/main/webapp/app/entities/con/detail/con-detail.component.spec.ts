import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConDetailComponent } from './con-detail.component';

describe('Con Management Detail Component', () => {
  let comp: ConDetailComponent;
  let fixture: ComponentFixture<ConDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./con-detail.component').then(m => m.ConDetailComponent),
              resolve: { con: () => of({ id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ConDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load con on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ConDetailComponent);

      // THEN
      expect(instance.con()).toEqual(expect.objectContaining({ id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' }));
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
