import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKnowledgeTag } from '../knowledge-tag.model';
import { KnowledgeTagService } from '../service/knowledge-tag.service';
import { KnowledgeTagFormGroup, KnowledgeTagFormService } from './knowledge-tag-form.service';

@Component({
  selector: 'jhi-knowledge-tag-update',
  templateUrl: './knowledge-tag-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KnowledgeTagUpdateComponent implements OnInit {
  isSaving = false;
  knowledgeTag: IKnowledgeTag | null = null;

  protected knowledgeTagService = inject(KnowledgeTagService);
  protected knowledgeTagFormService = inject(KnowledgeTagFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: KnowledgeTagFormGroup = this.knowledgeTagFormService.createKnowledgeTagFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ knowledgeTag }) => {
      this.knowledgeTag = knowledgeTag;
      if (knowledgeTag) {
        this.updateForm(knowledgeTag);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const knowledgeTag = this.knowledgeTagFormService.getKnowledgeTag(this.editForm);
    if (knowledgeTag.id !== null) {
      this.subscribeToSaveResponse(this.knowledgeTagService.update(knowledgeTag));
    } else {
      this.subscribeToSaveResponse(this.knowledgeTagService.create(knowledgeTag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKnowledgeTag>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(knowledgeTag: IKnowledgeTag): void {
    this.knowledgeTag = knowledgeTag;
    this.knowledgeTagFormService.resetForm(this.editForm, knowledgeTag);
  }
}
