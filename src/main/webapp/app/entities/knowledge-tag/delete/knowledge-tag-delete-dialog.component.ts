import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKnowledgeTag } from '../knowledge-tag.model';
import { KnowledgeTagService } from '../service/knowledge-tag.service';

@Component({
  templateUrl: './knowledge-tag-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KnowledgeTagDeleteDialogComponent {
  knowledgeTag?: IKnowledgeTag;

  protected knowledgeTagService = inject(KnowledgeTagService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.knowledgeTagService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
