import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IKnowledgeTag } from 'app/entities/knowledge-tag/knowledge-tag.model';
import { KnowledgeTagService } from 'app/entities/knowledge-tag/service/knowledge-tag.service';
import { KnowledgeItemService } from '../service/knowledge-item.service';
import { IKnowledgeItem } from '../knowledge-item.model';
import { KnowledgeItemFormGroup, KnowledgeItemFormService } from './knowledge-item-form.service';

@Component({
  selector: 'jhi-knowledge-item-update',
  templateUrl: './knowledge-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KnowledgeItemUpdateComponent implements OnInit {
  isSaving = false;
  knowledgeItem: IKnowledgeItem | null = null;

  knowledgeTagsSharedCollection: IKnowledgeTag[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected knowledgeItemService = inject(KnowledgeItemService);
  protected knowledgeItemFormService = inject(KnowledgeItemFormService);
  protected knowledgeTagService = inject(KnowledgeTagService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: KnowledgeItemFormGroup = this.knowledgeItemFormService.createKnowledgeItemFormGroup();

  compareKnowledgeTag = (o1: IKnowledgeTag | null, o2: IKnowledgeTag | null): boolean =>
    this.knowledgeTagService.compareKnowledgeTag(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ knowledgeItem }) => {
      this.knowledgeItem = knowledgeItem;
      if (knowledgeItem) {
        this.updateForm(knowledgeItem);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('kNetworkAdminApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const knowledgeItem = this.knowledgeItemFormService.getKnowledgeItem(this.editForm);
    if (knowledgeItem.id !== null) {
      this.subscribeToSaveResponse(this.knowledgeItemService.update(knowledgeItem));
    } else {
      this.subscribeToSaveResponse(this.knowledgeItemService.create(knowledgeItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKnowledgeItem>>): void {
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

  protected updateForm(knowledgeItem: IKnowledgeItem): void {
    this.knowledgeItem = knowledgeItem;
    this.knowledgeItemFormService.resetForm(this.editForm, knowledgeItem);

    this.knowledgeTagsSharedCollection = this.knowledgeTagService.addKnowledgeTagToCollectionIfMissing<IKnowledgeTag>(
      this.knowledgeTagsSharedCollection,
      ...(knowledgeItem.tags ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.knowledgeTagService
      .query()
      .pipe(map((res: HttpResponse<IKnowledgeTag[]>) => res.body ?? []))
      .pipe(
        map((knowledgeTags: IKnowledgeTag[]) =>
          this.knowledgeTagService.addKnowledgeTagToCollectionIfMissing<IKnowledgeTag>(knowledgeTags, ...(this.knowledgeItem?.tags ?? [])),
        ),
      )
      .subscribe((knowledgeTags: IKnowledgeTag[]) => (this.knowledgeTagsSharedCollection = knowledgeTags));
  }
}
