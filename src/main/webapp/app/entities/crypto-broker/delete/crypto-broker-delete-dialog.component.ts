import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICryptoBroker } from '../crypto-broker.model';
import { CryptoBrokerService } from '../service/crypto-broker.service';

@Component({
  templateUrl: './crypto-broker-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CryptoBrokerDeleteDialogComponent {
  cryptoBroker?: ICryptoBroker;

  protected cryptoBrokerService = inject(CryptoBrokerService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cryptoBrokerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
