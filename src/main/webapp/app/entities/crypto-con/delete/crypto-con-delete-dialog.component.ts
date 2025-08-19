import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICryptoCon } from '../crypto-con.model';
import { CryptoConService } from '../service/crypto-con.service';

@Component({
  templateUrl: './crypto-con-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CryptoConDeleteDialogComponent {
  cryptoCon?: ICryptoCon;

  protected cryptoConService = inject(CryptoConService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cryptoConService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
