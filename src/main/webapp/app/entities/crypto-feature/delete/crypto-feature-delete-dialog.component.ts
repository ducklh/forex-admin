import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICryptoFeature } from '../crypto-feature.model';
import { CryptoFeatureService } from '../service/crypto-feature.service';

@Component({
  templateUrl: './crypto-feature-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CryptoFeatureDeleteDialogComponent {
  cryptoFeature?: ICryptoFeature;

  protected cryptoFeatureService = inject(CryptoFeatureService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cryptoFeatureService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
