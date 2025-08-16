import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPro } from '../pro.model';
import { ProService } from '../service/pro.service';

@Component({
  templateUrl: './pro-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProDeleteDialogComponent {
  pro?: IPro;

  protected proService = inject(ProService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.proService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
