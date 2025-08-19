import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILanguageSupport } from '../language-support.model';
import { LanguageSupportService } from '../service/language-support.service';

@Component({
  templateUrl: './language-support-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LanguageSupportDeleteDialogComponent {
  languageSupport?: ILanguageSupport;

  protected languageSupportService = inject(LanguageSupportService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.languageSupportService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
