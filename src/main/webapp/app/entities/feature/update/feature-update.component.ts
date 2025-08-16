import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { IFeature } from '../feature.model';
import { FeatureService } from '../service/feature.service';
import { FeatureFormGroup, FeatureFormService } from './feature-form.service';

@Component({
  selector: 'jhi-feature-update',
  templateUrl: './feature-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FeatureUpdateComponent implements OnInit {
  isSaving = false;
  feature: IFeature | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected featureService = inject(FeatureService);
  protected featureFormService = inject(FeatureFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FeatureFormGroup = this.featureFormService.createFeatureFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feature }) => {
      this.feature = feature;
      if (feature) {
        this.updateForm(feature);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feature = this.featureFormService.getFeature(this.editForm);
    if (feature.id !== null) {
      this.subscribeToSaveResponse(this.featureService.update(feature));
    } else {
      this.subscribeToSaveResponse(this.featureService.create(feature));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeature>>): void {
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

  protected updateForm(feature: IFeature): void {
    this.feature = feature;
    this.featureFormService.resetForm(this.editForm, feature);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(this.brokersSharedCollection, feature.broker);
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.feature?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
