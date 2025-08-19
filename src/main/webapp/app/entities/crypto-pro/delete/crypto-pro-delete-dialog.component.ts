import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICryptoPro } from '../crypto-pro.model';
import { CryptoProService } from '../service/crypto-pro.service';

@Component({
  templateUrl: './crypto-pro-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CryptoProDeleteDialogComponent {
  cryptoPro?: ICryptoPro;

  protected cryptoProService = inject(CryptoProService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cryptoProService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
