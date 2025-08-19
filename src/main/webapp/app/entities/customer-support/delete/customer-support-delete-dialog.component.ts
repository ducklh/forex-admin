import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICustomerSupport } from '../customer-support.model';
import { CustomerSupportService } from '../service/customer-support.service';

@Component({
  templateUrl: './customer-support-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CustomerSupportDeleteDialogComponent {
  customerSupport?: ICustomerSupport;

  protected customerSupportService = inject(CustomerSupportService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.customerSupportService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
