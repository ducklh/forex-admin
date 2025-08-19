import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICryptoFeature } from '../crypto-feature.model';

@Component({
  selector: 'jhi-crypto-feature-detail',
  templateUrl: './crypto-feature-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CryptoFeatureDetailComponent {
  cryptoFeature = input<ICryptoFeature | null>(null);

  previousState(): void {
    window.history.back();
  }
}
