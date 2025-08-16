import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ISupport } from '../support.model';

@Component({
  selector: 'jhi-support-detail',
  templateUrl: './support-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class SupportDetailComponent {
  support = input<ISupport | null>(null);

  previousState(): void {
    window.history.back();
  }
}
