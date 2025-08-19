import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IKnowledgeTag } from '../knowledge-tag.model';

@Component({
  selector: 'jhi-knowledge-tag-detail',
  templateUrl: './knowledge-tag-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class KnowledgeTagDetailComponent {
  knowledgeTag = input<IKnowledgeTag | null>(null);

  previousState(): void {
    window.history.back();
  }
}
