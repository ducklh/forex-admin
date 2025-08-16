import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { IPaymentMethod } from '../payment-method.model';
import { PaymentMethodService } from '../service/payment-method.service';
import { PaymentMethodFormGroup, PaymentMethodFormService } from './payment-method-form.service';

@Component({
  selector: 'jhi-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PaymentMethodUpdateComponent implements OnInit {
  isSaving = false;
  paymentMethod: IPaymentMethod | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected paymentMethodService = inject(PaymentMethodService);
  protected paymentMethodFormService = inject(PaymentMethodFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PaymentMethodFormGroup = this.paymentMethodFormService.createPaymentMethodFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentMethod }) => {
      this.paymentMethod = paymentMethod;
      if (paymentMethod) {
        this.updateForm(paymentMethod);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentMethod = this.paymentMethodFormService.getPaymentMethod(this.editForm);
    if (paymentMethod.id !== null) {
      this.subscribeToSaveResponse(this.paymentMethodService.update(paymentMethod));
    } else {
      this.subscribeToSaveResponse(this.paymentMethodService.create(paymentMethod));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentMethod>>): void {
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

  protected updateForm(paymentMethod: IPaymentMethod): void {
    this.paymentMethod = paymentMethod;
    this.paymentMethodFormService.resetForm(this.editForm, paymentMethod);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(
      this.brokersSharedCollection,
      paymentMethod.broker,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.paymentMethod?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
