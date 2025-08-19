import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICoin } from '../coin.model';
import { CoinService } from '../service/coin.service';
import { CoinFormGroup, CoinFormService } from './coin-form.service';

@Component({
  selector: 'jhi-coin-update',
  templateUrl: './coin-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CoinUpdateComponent implements OnInit {
  isSaving = false;
  coin: ICoin | null = null;

  protected coinService = inject(CoinService);
  protected coinFormService = inject(CoinFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CoinFormGroup = this.coinFormService.createCoinFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coin }) => {
      this.coin = coin;
      if (coin) {
        this.updateForm(coin);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coin = this.coinFormService.getCoin(this.editForm);
    if (coin.id !== null) {
      this.subscribeToSaveResponse(this.coinService.update(coin));
    } else {
      this.subscribeToSaveResponse(this.coinService.create(coin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoin>>): void {
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

  protected updateForm(coin: ICoin): void {
    this.coin = coin;
    this.coinFormService.resetForm(this.editForm, coin);
  }
}
