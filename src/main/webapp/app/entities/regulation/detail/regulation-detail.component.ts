import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IRegulation } from '../regulation.model';

@Component({
  selector: 'jhi-regulation-detail',
  templateUrl: './regulation-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class RegulationDetailComponent {
  regulation = input<IRegulation | null>(null);

  previousState(): void {
    window.history.back();
  }
}
