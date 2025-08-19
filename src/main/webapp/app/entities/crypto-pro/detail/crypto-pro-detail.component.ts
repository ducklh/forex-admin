import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICryptoPro } from '../crypto-pro.model';

@Component({
  selector: 'jhi-crypto-pro-detail',
  templateUrl: './crypto-pro-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CryptoProDetailComponent {
  cryptoPro = input<ICryptoPro | null>(null);

  previousState(): void {
    window.history.back();
  }
}
