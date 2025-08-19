import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPlatform } from '../platform.model';
import { PlatformService } from '../service/platform.service';
import { PlatformFormGroup, PlatformFormService } from './platform-form.service';

@Component({
  selector: 'jhi-platform-update',
  templateUrl: './platform-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PlatformUpdateComponent implements OnInit {
  isSaving = false;
  platform: IPlatform | null = null;

  protected platformService = inject(PlatformService);
  protected platformFormService = inject(PlatformFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PlatformFormGroup = this.platformFormService.createPlatformFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ platform }) => {
      this.platform = platform;
      if (platform) {
        this.updateForm(platform);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const platform = this.platformFormService.getPlatform(this.editForm);
    if (platform.id !== null) {
      this.subscribeToSaveResponse(this.platformService.update(platform));
    } else {
      this.subscribeToSaveResponse(this.platformService.create(platform));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlatform>>): void {
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

  protected updateForm(platform: IPlatform): void {
    this.platform = platform;
    this.platformFormService.resetForm(this.editForm, platform);
  }
}
