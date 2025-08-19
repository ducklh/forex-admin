import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { KnowledgeTagDetailComponent } from './knowledge-tag-detail.component';

describe('KnowledgeTag Management Detail Component', () => {
  let comp: KnowledgeTagDetailComponent;
  let fixture: ComponentFixture<KnowledgeTagDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeTagDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./knowledge-tag-detail.component').then(m => m.KnowledgeTagDetailComponent),
              resolve: { knowledgeTag: () => of({ id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(KnowledgeTagDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTagDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load knowledgeTag on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', KnowledgeTagDetailComponent);

      // THEN
      expect(instance.knowledgeTag()).toEqual(expect.objectContaining({ id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' }));
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
