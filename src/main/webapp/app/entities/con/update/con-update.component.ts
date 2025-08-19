import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICon } from '../con.model';
import { ConService } from '../service/con.service';
import { ConFormGroup, ConFormService } from './con-form.service';

@Component({
  selector: 'jhi-con-update',
  templateUrl: './con-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ConUpdateComponent implements OnInit {
  isSaving = false;
  con: ICon | null = null;

  protected conService = inject(ConService);
  protected conFormService = inject(ConFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ConFormGroup = this.conFormService.createConFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ con }) => {
      this.con = con;
      if (con) {
        this.updateForm(con);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const con = this.conFormService.getCon(this.editForm);
    if (con.id !== null) {
      this.subscribeToSaveResponse(this.conService.update(con));
    } else {
      this.subscribeToSaveResponse(this.conService.create(con));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICon>>): void {
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

  protected updateForm(con: ICon): void {
    this.con = con;
    this.conFormService.resetForm(this.editForm, con);
  }
}
