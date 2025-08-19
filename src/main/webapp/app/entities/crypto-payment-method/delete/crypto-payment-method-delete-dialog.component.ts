import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICryptoPaymentMethod } from '../crypto-payment-method.model';
import { CryptoPaymentMethodService } from '../service/crypto-payment-method.service';

@Component({
  templateUrl: './crypto-payment-method-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CryptoPaymentMethodDeleteDialogComponent {
  cryptoPaymentMethod?: ICryptoPaymentMethod;

  protected cryptoPaymentMethodService = inject(CryptoPaymentMethodService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cryptoPaymentMethodService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
