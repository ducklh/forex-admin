import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { ISupport } from '../support.model';
import { SupportService } from '../service/support.service';
import { SupportFormGroup, SupportFormService } from './support-form.service';

@Component({
  selector: 'jhi-support-update',
  templateUrl: './support-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SupportUpdateComponent implements OnInit {
  isSaving = false;
  support: ISupport | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected supportService = inject(SupportService);
  protected supportFormService = inject(SupportFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SupportFormGroup = this.supportFormService.createSupportFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ support }) => {
      this.support = support;
      if (support) {
        this.updateForm(support);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const support = this.supportFormService.getSupport(this.editForm);
    if (support.id !== null) {
      this.subscribeToSaveResponse(this.supportService.update(support));
    } else {
      this.subscribeToSaveResponse(this.supportService.create(support));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupport>>): void {
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

  protected updateForm(support: ISupport): void {
    this.support = support;
    this.supportFormService.resetForm(this.editForm, support);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(this.brokersSharedCollection, support.broker);
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.support?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
