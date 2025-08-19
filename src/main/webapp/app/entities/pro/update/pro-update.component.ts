import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPro } from '../pro.model';
import { ProService } from '../service/pro.service';
import { ProFormGroup, ProFormService } from './pro-form.service';

@Component({
  selector: 'jhi-pro-update',
  templateUrl: './pro-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProUpdateComponent implements OnInit {
  isSaving = false;
  pro: IPro | null = null;

  protected proService = inject(ProService);
  protected proFormService = inject(ProFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProFormGroup = this.proFormService.createProFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pro }) => {
      this.pro = pro;
      if (pro) {
        this.updateForm(pro);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pro = this.proFormService.getPro(this.editForm);
    if (pro.id !== null) {
      this.subscribeToSaveResponse(this.proService.update(pro));
    } else {
      this.subscribeToSaveResponse(this.proService.create(pro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPro>>): void {
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

  protected updateForm(pro: IPro): void {
    this.pro = pro;
    this.proFormService.resetForm(this.editForm, pro);
  }
}
