import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILanguage } from '../language.model';
import { LanguageService } from '../service/language.service';

@Component({
  templateUrl: './language-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LanguageDeleteDialogComponent {
  language?: ILanguage;

  protected languageService = inject(LanguageService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.languageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
