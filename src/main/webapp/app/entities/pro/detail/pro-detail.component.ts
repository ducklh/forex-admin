import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IPro } from '../pro.model';

@Component({
  selector: 'jhi-pro-detail',
  templateUrl: './pro-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ProDetailComponent {
  pro = input<IPro | null>(null);

  previousState(): void {
    window.history.back();
  }
}
