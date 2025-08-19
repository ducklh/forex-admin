import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICoin } from '../coin.model';

@Component({
  selector: 'jhi-coin-detail',
  templateUrl: './coin-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CoinDetailComponent {
  coin = input<ICoin | null>(null);

  previousState(): void {
    window.history.back();
  }
}
