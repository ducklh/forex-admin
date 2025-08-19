import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICoin } from '../coin.model';
import { CoinService } from '../service/coin.service';

@Component({
  templateUrl: './coin-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CoinDeleteDialogComponent {
  coin?: ICoin;

  protected coinService = inject(CoinService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.coinService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
