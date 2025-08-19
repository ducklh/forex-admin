import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SecurityFeatureDetailComponent } from './security-feature-detail.component';

describe('SecurityFeature Management Detail Component', () => {
  let comp: SecurityFeatureDetailComponent;
  let fixture: ComponentFixture<SecurityFeatureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityFeatureDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./security-feature-detail.component').then(m => m.SecurityFeatureDetailComponent),
              resolve: { securityFeature: () => of({ id: '4e413771-c7d3-4014-b303-c4386d933f82' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SecurityFeatureDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityFeatureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load securityFeature on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SecurityFeatureDetailComponent);

      // THEN
      expect(instance.securityFeature()).toEqual(expect.objectContaining({ id: '4e413771-c7d3-4014-b303-c4386d933f82' }));
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
