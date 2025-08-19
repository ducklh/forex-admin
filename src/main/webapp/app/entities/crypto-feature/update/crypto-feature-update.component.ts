import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICryptoFeature } from '../crypto-feature.model';
import { CryptoFeatureService } from '../service/crypto-feature.service';
import { CryptoFeatureFormGroup, CryptoFeatureFormService } from './crypto-feature-form.service';

@Component({
  selector: 'jhi-crypto-feature-update',
  templateUrl: './crypto-feature-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CryptoFeatureUpdateComponent implements OnInit {
  isSaving = false;
  cryptoFeature: ICryptoFeature | null = null;

  protected cryptoFeatureService = inject(CryptoFeatureService);
  protected cryptoFeatureFormService = inject(CryptoFeatureFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoFeatureFormGroup = this.cryptoFeatureFormService.createCryptoFeatureFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoFeature }) => {
      this.cryptoFeature = cryptoFeature;
      if (cryptoFeature) {
        this.updateForm(cryptoFeature);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cryptoFeature = this.cryptoFeatureFormService.getCryptoFeature(this.editForm);
    if (cryptoFeature.id !== null) {
      this.subscribeToSaveResponse(this.cryptoFeatureService.update(cryptoFeature));
    } else {
      this.subscribeToSaveResponse(this.cryptoFeatureService.create(cryptoFeature));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICryptoFeature>>): void {
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

  protected updateForm(cryptoFeature: ICryptoFeature): void {
    this.cryptoFeature = cryptoFeature;
    this.cryptoFeatureFormService.resetForm(this.editForm, cryptoFeature);
  }
}
