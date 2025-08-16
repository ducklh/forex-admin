import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICon } from '../con.model';
import { ConService } from '../service/con.service';

@Component({
  templateUrl: './con-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ConDeleteDialogComponent {
  con?: ICon;

  protected conService = inject(ConService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.conService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
