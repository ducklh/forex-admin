import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICryptoCon } from '../crypto-con.model';
import { CryptoConService } from '../service/crypto-con.service';
import { CryptoConFormGroup, CryptoConFormService } from './crypto-con-form.service';

@Component({
  selector: 'jhi-crypto-con-update',
  templateUrl: './crypto-con-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CryptoConUpdateComponent implements OnInit {
  isSaving = false;
  cryptoCon: ICryptoCon | null = null;

  protected cryptoConService = inject(CryptoConService);
  protected cryptoConFormService = inject(CryptoConFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoConFormGroup = this.cryptoConFormService.createCryptoConFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoCon }) => {
      this.cryptoCon = cryptoCon;
      if (cryptoCon) {
        this.updateForm(cryptoCon);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cryptoCon = this.cryptoConFormService.getCryptoCon(this.editForm);
    if (cryptoCon.id !== null) {
      this.subscribeToSaveResponse(this.cryptoConService.update(cryptoCon));
    } else {
      this.subscribeToSaveResponse(this.cryptoConService.create(cryptoCon));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICryptoCon>>): void {
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

  protected updateForm(cryptoCon: ICryptoCon): void {
    this.cryptoCon = cryptoCon;
    this.cryptoConFormService.resetForm(this.editForm, cryptoCon);
  }
}
