import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICryptoCon } from '../crypto-con.model';

@Component({
  selector: 'jhi-crypto-con-detail',
  templateUrl: './crypto-con-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CryptoConDetailComponent {
  cryptoCon = input<ICryptoCon | null>(null);

  previousState(): void {
    window.history.back();
  }
}
