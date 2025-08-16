import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { BrokerService } from '../service/broker.service';
import { IBroker } from '../broker.model';
import { BrokerFormGroup, BrokerFormService } from './broker-form.service';

@Component({
  selector: 'jhi-broker-update',
  templateUrl: './broker-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BrokerUpdateComponent implements OnInit {
  isSaving = false;
  broker: IBroker | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected brokerService = inject(BrokerService);
  protected brokerFormService = inject(BrokerFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BrokerFormGroup = this.brokerFormService.createBrokerFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ broker }) => {
      this.broker = broker;
      if (broker) {
        this.updateForm(broker);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('forexBeApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const broker = this.brokerFormService.getBroker(this.editForm);
    if (broker.id !== null) {
      this.subscribeToSaveResponse(this.brokerService.update(broker));
    } else {
      this.subscribeToSaveResponse(this.brokerService.create(broker));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBroker>>): void {
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

  protected updateForm(broker: IBroker): void {
    this.broker = broker;
    this.brokerFormService.resetForm(this.editForm, broker);
  }
}
