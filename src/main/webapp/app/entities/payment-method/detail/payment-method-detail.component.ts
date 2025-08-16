import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IPaymentMethod } from '../payment-method.model';

@Component({
  selector: 'jhi-payment-method-detail',
  templateUrl: './payment-method-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class PaymentMethodDetailComponent {
  paymentMethod = input<IPaymentMethod | null>(null);

  previousState(): void {
    window.history.back();
  }
}
