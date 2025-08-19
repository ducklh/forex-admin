import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISecurityFeature } from '../security-feature.model';
import { SecurityFeatureService } from '../service/security-feature.service';
import { SecurityFeatureFormGroup, SecurityFeatureFormService } from './security-feature-form.service';

@Component({
  selector: 'jhi-security-feature-update',
  templateUrl: './security-feature-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SecurityFeatureUpdateComponent implements OnInit {
  isSaving = false;
  securityFeature: ISecurityFeature | null = null;

  protected securityFeatureService = inject(SecurityFeatureService);
  protected securityFeatureFormService = inject(SecurityFeatureFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SecurityFeatureFormGroup = this.securityFeatureFormService.createSecurityFeatureFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ securityFeature }) => {
      this.securityFeature = securityFeature;
      if (securityFeature) {
        this.updateForm(securityFeature);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const securityFeature = this.securityFeatureFormService.getSecurityFeature(this.editForm);
    if (securityFeature.id !== null) {
      this.subscribeToSaveResponse(this.securityFeatureService.update(securityFeature));
    } else {
      this.subscribeToSaveResponse(this.securityFeatureService.create(securityFeature));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecurityFeature>>): void {
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

  protected updateForm(securityFeature: ISecurityFeature): void {
    this.securityFeature = securityFeature;
    this.securityFeatureFormService.resetForm(this.editForm, securityFeature);
  }
}
