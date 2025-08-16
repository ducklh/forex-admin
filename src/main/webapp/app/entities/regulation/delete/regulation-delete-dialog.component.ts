import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRegulation } from '../regulation.model';
import { RegulationService } from '../service/regulation.service';

@Component({
  templateUrl: './regulation-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RegulationDeleteDialogComponent {
  regulation?: IRegulation;

  protected regulationService = inject(RegulationService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.regulationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
