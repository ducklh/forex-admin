import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICryptoPro } from '../crypto-pro.model';
import { CryptoProService } from '../service/crypto-pro.service';
import { CryptoProFormGroup, CryptoProFormService } from './crypto-pro-form.service';

@Component({
  selector: 'jhi-crypto-pro-update',
  templateUrl: './crypto-pro-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CryptoProUpdateComponent implements OnInit {
  isSaving = false;
  cryptoPro: ICryptoPro | null = null;

  protected cryptoProService = inject(CryptoProService);
  protected cryptoProFormService = inject(CryptoProFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoProFormGroup = this.cryptoProFormService.createCryptoProFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoPro }) => {
      this.cryptoPro = cryptoPro;
      if (cryptoPro) {
        this.updateForm(cryptoPro);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cryptoPro = this.cryptoProFormService.getCryptoPro(this.editForm);
    if (cryptoPro.id !== null) {
      this.subscribeToSaveResponse(this.cryptoProService.update(cryptoPro));
    } else {
      this.subscribeToSaveResponse(this.cryptoProService.create(cryptoPro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICryptoPro>>): void {
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

  protected updateForm(cryptoPro: ICryptoPro): void {
    this.cryptoPro = cryptoPro;
    this.cryptoProFormService.resetForm(this.editForm, cryptoPro);
  }
}
