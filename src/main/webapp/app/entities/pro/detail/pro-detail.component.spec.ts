import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProDetailComponent } from './pro-detail.component';

describe('Pro Management Detail Component', () => {
  let comp: ProDetailComponent;
  let fixture: ComponentFixture<ProDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./pro-detail.component').then(m => m.ProDetailComponent),
              resolve: { pro: () => of({ id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pro on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProDetailComponent);

      // THEN
      expect(instance.pro()).toEqual(expect.objectContaining({ id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' }));
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
