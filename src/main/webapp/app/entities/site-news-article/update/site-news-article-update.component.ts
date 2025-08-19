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
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { SiteNewsArticleService } from '../service/site-news-article.service';
import { ISiteNewsArticle } from '../site-news-article.model';
import { SiteNewsArticleFormGroup, SiteNewsArticleFormService } from './site-news-article-form.service';

@Component({
  selector: 'jhi-site-news-article-update',
  templateUrl: './site-news-article-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SiteNewsArticleUpdateComponent implements OnInit {
  isSaving = false;
  siteNewsArticle: ISiteNewsArticle | null = null;

  tagsSharedCollection: ITag[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected siteNewsArticleService = inject(SiteNewsArticleService);
  protected siteNewsArticleFormService = inject(SiteNewsArticleFormService);
  protected tagService = inject(TagService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SiteNewsArticleFormGroup = this.siteNewsArticleFormService.createSiteNewsArticleFormGroup();

  compareTag = (o1: ITag | null, o2: ITag | null): boolean => this.tagService.compareTag(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ siteNewsArticle }) => {
      this.siteNewsArticle = siteNewsArticle;
      if (siteNewsArticle) {
        this.updateForm(siteNewsArticle);
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
    const siteNewsArticle = this.siteNewsArticleFormService.getSiteNewsArticle(this.editForm);
    if (siteNewsArticle.id !== null) {
      this.subscribeToSaveResponse(this.siteNewsArticleService.update(siteNewsArticle));
    } else {
      this.subscribeToSaveResponse(this.siteNewsArticleService.create(siteNewsArticle));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISiteNewsArticle>>): void {
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

  protected updateForm(siteNewsArticle: ISiteNewsArticle): void {
    this.siteNewsArticle = siteNewsArticle;
    this.siteNewsArticleFormService.resetForm(this.editForm, siteNewsArticle);

    this.tagsSharedCollection = this.tagService.addTagToCollectionIfMissing<ITag>(
      this.tagsSharedCollection,
      ...(siteNewsArticle.tags ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tagService
      .query()
      .pipe(map((res: HttpResponse<ITag[]>) => res.body ?? []))
      .pipe(map((tags: ITag[]) => this.tagService.addTagToCollectionIfMissing<ITag>(tags, ...(this.siteNewsArticle?.tags ?? []))))
      .subscribe((tags: ITag[]) => (this.tagsSharedCollection = tags));
  }
}
