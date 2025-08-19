import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKnowledgeItem } from '../knowledge-item.model';
import { KnowledgeItemService } from '../service/knowledge-item.service';

@Component({
  templateUrl: './knowledge-item-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KnowledgeItemDeleteDialogComponent {
  knowledgeItem?: IKnowledgeItem;

  protected knowledgeItemService = inject(KnowledgeItemService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.knowledgeItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
