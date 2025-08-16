import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICon } from '../con.model';

@Component({
  selector: 'jhi-con-detail',
  templateUrl: './con-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ConDetailComponent {
  con = input<ICon | null>(null);

  previousState(): void {
    window.history.back();
  }
}
