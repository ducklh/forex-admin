import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISupport } from '../support.model';
import { SupportService } from '../service/support.service';

@Component({
  templateUrl: './support-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SupportDeleteDialogComponent {
  support?: ISupport;

  protected supportService = inject(SupportService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.supportService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
