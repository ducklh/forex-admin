import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { IRegulation } from '../regulation.model';
import { RegulationService } from '../service/regulation.service';
import { RegulationFormGroup, RegulationFormService } from './regulation-form.service';

@Component({
  selector: 'jhi-regulation-update',
  templateUrl: './regulation-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RegulationUpdateComponent implements OnInit {
  isSaving = false;
  regulation: IRegulation | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected regulationService = inject(RegulationService);
  protected regulationFormService = inject(RegulationFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RegulationFormGroup = this.regulationFormService.createRegulationFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regulation }) => {
      this.regulation = regulation;
      if (regulation) {
        this.updateForm(regulation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regulation = this.regulationFormService.getRegulation(this.editForm);
    if (regulation.id !== null) {
      this.subscribeToSaveResponse(this.regulationService.update(regulation));
    } else {
      this.subscribeToSaveResponse(this.regulationService.create(regulation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegulation>>): void {
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

  protected updateForm(regulation: IRegulation): void {
    this.regulation = regulation;
    this.regulationFormService.resetForm(this.editForm, regulation);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(
      this.brokersSharedCollection,
      regulation.broker,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.regulation?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
