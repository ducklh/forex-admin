import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ILanguageSupport } from '../language-support.model';

@Component({
  selector: 'jhi-language-support-detail',
  templateUrl: './language-support-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class LanguageSupportDetailComponent {
  languageSupport = input<ILanguageSupport | null>(null);

  previousState(): void {
    window.history.back();
  }
}
