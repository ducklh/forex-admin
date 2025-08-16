import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IPlatform } from '../platform.model';

@Component({
  selector: 'jhi-platform-detail',
  templateUrl: './platform-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class PlatformDetailComponent {
  platform = input<IPlatform | null>(null);

  previousState(): void {
    window.history.back();
  }
}
