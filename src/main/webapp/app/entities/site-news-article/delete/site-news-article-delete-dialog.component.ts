import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISiteNewsArticle } from '../site-news-article.model';
import { SiteNewsArticleService } from '../service/site-news-article.service';

@Component({
  templateUrl: './site-news-article-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SiteNewsArticleDeleteDialogComponent {
  siteNewsArticle?: ISiteNewsArticle;

  protected siteNewsArticleService = inject(SiteNewsArticleService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.siteNewsArticleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
