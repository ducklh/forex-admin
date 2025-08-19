import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICryptoPaymentMethod } from '../crypto-payment-method.model';
import { CryptoPaymentMethodService } from '../service/crypto-payment-method.service';
import { CryptoPaymentMethodFormGroup, CryptoPaymentMethodFormService } from './crypto-payment-method-form.service';

@Component({
  selector: 'jhi-crypto-payment-method-update',
  templateUrl: './crypto-payment-method-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CryptoPaymentMethodUpdateComponent implements OnInit {
  isSaving = false;
  cryptoPaymentMethod: ICryptoPaymentMethod | null = null;

  protected cryptoPaymentMethodService = inject(CryptoPaymentMethodService);
  protected cryptoPaymentMethodFormService = inject(CryptoPaymentMethodFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoPaymentMethodFormGroup = this.cryptoPaymentMethodFormService.createCryptoPaymentMethodFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoPaymentMethod }) => {
      this.cryptoPaymentMethod = cryptoPaymentMethod;
      if (cryptoPaymentMethod) {
        this.updateForm(cryptoPaymentMethod);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cryptoPaymentMethod = this.cryptoPaymentMethodFormService.getCryptoPaymentMethod(this.editForm);
    if (cryptoPaymentMethod.id !== null) {
      this.subscribeToSaveResponse(this.cryptoPaymentMethodService.update(cryptoPaymentMethod));
    } else {
      this.subscribeToSaveResponse(this.cryptoPaymentMethodService.create(cryptoPaymentMethod));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICryptoPaymentMethod>>): void {
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

  protected updateForm(cryptoPaymentMethod: ICryptoPaymentMethod): void {
    this.cryptoPaymentMethod = cryptoPaymentMethod;
    this.cryptoPaymentMethodFormService.resetForm(this.editForm, cryptoPaymentMethod);
  }
}
