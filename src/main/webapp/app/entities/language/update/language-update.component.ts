import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBroker } from 'app/entities/broker/broker.model';
import { BrokerService } from 'app/entities/broker/service/broker.service';
import { ILanguage } from '../language.model';
import { LanguageService } from '../service/language.service';
import { LanguageFormGroup, LanguageFormService } from './language-form.service';

@Component({
  selector: 'jhi-language-update',
  templateUrl: './language-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LanguageUpdateComponent implements OnInit {
  isSaving = false;
  language: ILanguage | null = null;

  brokersSharedCollection: IBroker[] = [];

  protected languageService = inject(LanguageService);
  protected languageFormService = inject(LanguageFormService);
  protected brokerService = inject(BrokerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LanguageFormGroup = this.languageFormService.createLanguageFormGroup();

  compareBroker = (o1: IBroker | null, o2: IBroker | null): boolean => this.brokerService.compareBroker(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.language = language;
      if (language) {
        this.updateForm(language);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const language = this.languageFormService.getLanguage(this.editForm);
    if (language.id !== null) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguage>>): void {
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

  protected updateForm(language: ILanguage): void {
    this.language = language;
    this.languageFormService.resetForm(this.editForm, language);

    this.brokersSharedCollection = this.brokerService.addBrokerToCollectionIfMissing<IBroker>(
      this.brokersSharedCollection,
      language.broker,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.brokerService
      .query()
      .pipe(map((res: HttpResponse<IBroker[]>) => res.body ?? []))
      .pipe(map((brokers: IBroker[]) => this.brokerService.addBrokerToCollectionIfMissing<IBroker>(brokers, this.language?.broker)))
      .subscribe((brokers: IBroker[]) => (this.brokersSharedCollection = brokers));
  }
}
