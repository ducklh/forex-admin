import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISupport } from '../support.model';
import { SupportService } from '../service/support.service';
import { SupportFormGroup, SupportFormService } from './support-form.service';

@Component({
  selector: 'jhi-support-update',
  templateUrl: './support-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SupportUpdateComponent implements OnInit {
  isSaving = false;
  support: ISupport | null = null;

  protected supportService = inject(SupportService);
  protected supportFormService = inject(SupportFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SupportFormGroup = this.supportFormService.createSupportFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ support }) => {
      this.support = support;
      if (support) {
        this.updateForm(support);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const support = this.supportFormService.getSupport(this.editForm);
    if (support.id !== null) {
      this.subscribeToSaveResponse(this.supportService.update(support));
    } else {
      this.subscribeToSaveResponse(this.supportService.create(support));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupport>>): void {
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

  protected updateForm(support: ISupport): void {
    this.support = support;
    this.supportFormService.resetForm(this.editForm, support);
  }
}
