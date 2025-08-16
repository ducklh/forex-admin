import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { IPro } from '../pro.model';
import { ProService } from '../service/pro.service';
import { ProFormGroup, ProFormService } from './pro-form.service';

@Component({
  selector: 'jhi-pro-update',
  templateUrl: './pro-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProUpdateComponent implements OnInit {
  isSaving = false;
  pro: IPro | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected proService = inject(ProService);
  protected proFormService = inject(ProFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProFormGroup = this.proFormService.createProFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pro }) => {
      this.pro = pro;
      if (pro) {
        this.updateForm(pro);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pro = this.proFormService.getPro(this.editForm);
    if (pro.id !== null) {
      this.subscribeToSaveResponse(this.proService.update(pro));
    } else {
      this.subscribeToSaveResponse(this.proService.create(pro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPro>>): void {
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

  protected updateForm(pro: IPro): void {
    this.pro = pro;
    this.proFormService.resetForm(this.editForm, pro);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(this.brokersSharedCollection, pro.broker);
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.pro?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
