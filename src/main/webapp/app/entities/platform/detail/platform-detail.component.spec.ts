import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { PlatformDetailComponent } from './platform-detail.component';

describe('Platform Management Detail Component', () => {
  let comp: PlatformDetailComponent;
  let fixture: ComponentFixture<PlatformDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./platform-detail.component').then(m => m.PlatformDetailComponent),
              resolve: { platform: () => of({ id: '2368b766-4eae-434c-b330-4997a5ab5113' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(PlatformDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load platform on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PlatformDetailComponent);

      // THEN
      expect(instance.platform()).toEqual(expect.objectContaining({ id: '2368b766-4eae-434c-b330-4997a5ab5113' }));
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
