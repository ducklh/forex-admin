import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICryptoPaymentMethod } from '../crypto-payment-method.model';

@Component({
  selector: 'jhi-crypto-payment-method-detail',
  templateUrl: './crypto-payment-method-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CryptoPaymentMethodDetailComponent {
  cryptoPaymentMethod = input<ICryptoPaymentMethod | null>(null);

  previousState(): void {
    window.history.back();
  }
}
