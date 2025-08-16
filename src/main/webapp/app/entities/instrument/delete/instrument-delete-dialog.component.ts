import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IInstrument } from '../instrument.model';
import { InstrumentService } from '../service/instrument.service';

@Component({
  templateUrl: './instrument-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class InstrumentDeleteDialogComponent {
  instrument?: IInstrument;

  protected instrumentService = inject(InstrumentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.instrumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
