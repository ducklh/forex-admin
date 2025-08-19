import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISecurityFeature } from '../security-feature.model';
import { SecurityFeatureService } from '../service/security-feature.service';

@Component({
  templateUrl: './security-feature-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SecurityFeatureDeleteDialogComponent {
  securityFeature?: ISecurityFeature;

  protected securityFeatureService = inject(SecurityFeatureService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.securityFeatureService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
