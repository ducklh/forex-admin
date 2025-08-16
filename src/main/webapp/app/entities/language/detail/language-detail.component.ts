import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ILanguage } from '../language.model';

@Component({
  selector: 'jhi-language-detail',
  templateUrl: './language-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class LanguageDetailComponent {
  language = input<ILanguage | null>(null);

  previousState(): void {
    window.history.back();
  }
}
