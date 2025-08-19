import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ISecurityFeature } from '../security-feature.model';

@Component({
  selector: 'jhi-security-feature-detail',
  templateUrl: './security-feature-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class SecurityFeatureDetailComponent {
  securityFeature = input<ISecurityFeature | null>(null);

  previousState(): void {
    window.history.back();
  }
}
