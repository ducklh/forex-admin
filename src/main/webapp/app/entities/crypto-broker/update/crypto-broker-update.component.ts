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
import { CryptoBrokerService } from '../service/crypto-broker.service';
import { ICryptoBroker } from '../crypto-broker.model';
import { CryptoBrokerFormGroup, CryptoBrokerFormService } from './crypto-broker-form.service';

@Component({
  selector: 'jhi-crypto-broker-update',
  templateUrl: './crypto-broker-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CryptoBrokerUpdateComponent implements OnInit {
  isSaving = false;
  cryptoBroker: ICryptoBroker | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected cryptoBrokerService = inject(CryptoBrokerService);
  protected cryptoBrokerFormService = inject(CryptoBrokerFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoBrokerFormGroup = this.cryptoBrokerFormService.createCryptoBrokerFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoBroker }) => {
      this.cryptoBroker = cryptoBroker;
      if (cryptoBroker) {
        this.updateForm(cryptoBroker);
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
    const cryptoBroker = this.cryptoBrokerFormService.getCryptoBroker(this.editForm);
    if (cryptoBroker.id !== null) {
      this.subscribeToSaveResponse(this.cryptoBrokerService.update(cryptoBroker));
    } else {
      this.subscribeToSaveResponse(this.cryptoBrokerService.create(cryptoBroker));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICryptoBroker>>): void {
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

  protected updateForm(cryptoBroker: ICryptoBroker): void {
    this.cryptoBroker = cryptoBroker;
    this.cryptoBrokerFormService.resetForm(this.editForm, cryptoBroker);
  }
}
