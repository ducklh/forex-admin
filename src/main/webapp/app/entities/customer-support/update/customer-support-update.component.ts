import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICustomerSupport } from '../customer-support.model';
import { CustomerSupportService } from '../service/customer-support.service';
import { CustomerSupportFormGroup, CustomerSupportFormService } from './customer-support-form.service';

@Component({
  selector: 'jhi-customer-support-update',
  templateUrl: './customer-support-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CustomerSupportUpdateComponent implements OnInit {
  isSaving = false;
  customerSupport: ICustomerSupport | null = null;

  protected customerSupportService = inject(CustomerSupportService);
  protected customerSupportFormService = inject(CustomerSupportFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CustomerSupportFormGroup = this.customerSupportFormService.createCustomerSupportFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerSupport }) => {
      this.customerSupport = customerSupport;
      if (customerSupport) {
        this.updateForm(customerSupport);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerSupport = this.customerSupportFormService.getCustomerSupport(this.editForm);
    if (customerSupport.id !== null) {
      this.subscribeToSaveResponse(this.customerSupportService.update(customerSupport));
    } else {
      this.subscribeToSaveResponse(this.customerSupportService.create(customerSupport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerSupport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(customerSupport: ICustomerSupport): void {
    this.customerSupport = customerSupport;
    this.customerSupportFormService.resetForm(this.editForm, customerSupport);
  }
}
