import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IForexBroker } from '../forex-broker.model';
import { ForexBrokerService } from '../service/forex-broker.service';

@Component({
  templateUrl: './forex-broker-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ForexBrokerDeleteDialogComponent {
  forexBroker?: IForexBroker;

  protected forexBrokerService = inject(ForexBrokerService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.forexBrokerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
