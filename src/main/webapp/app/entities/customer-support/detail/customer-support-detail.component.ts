import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICustomerSupport } from '../customer-support.model';

@Component({
  selector: 'jhi-customer-support-detail',
  templateUrl: './customer-support-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CustomerSupportDetailComponent {
  customerSupport = input<ICustomerSupport | null>(null);

  previousState(): void {
    window.history.back();
  }
}
