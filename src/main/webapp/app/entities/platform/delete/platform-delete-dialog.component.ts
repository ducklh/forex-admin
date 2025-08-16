import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPlatform } from '../platform.model';
import { PlatformService } from '../service/platform.service';

@Component({
  templateUrl: './platform-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class PlatformDeleteDialogComponent {
  platform?: IPlatform;

  protected platformService = inject(PlatformService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.platformService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
