import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { IPlatform } from '../platform.model';
import { PlatformService } from '../service/platform.service';
import { PlatformFormGroup, PlatformFormService } from './platform-form.service';

@Component({
  selector: 'jhi-platform-update',
  templateUrl: './platform-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PlatformUpdateComponent implements OnInit {
  isSaving = false;
  platform: IPlatform | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected platformService = inject(PlatformService);
  protected platformFormService = inject(PlatformFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PlatformFormGroup = this.platformFormService.createPlatformFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ platform }) => {
      this.platform = platform;
      if (platform) {
        this.updateForm(platform);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const platform = this.platformFormService.getPlatform(this.editForm);
    if (platform.id !== null) {
      this.subscribeToSaveResponse(this.platformService.update(platform));
    } else {
      this.subscribeToSaveResponse(this.platformService.create(platform));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlatform>>): void {
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

  protected updateForm(platform: IPlatform): void {
    this.platform = platform;
    this.platformFormService.resetForm(this.editForm, platform);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(
      this.brokersSharedCollection,
      platform.broker,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.platform?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
