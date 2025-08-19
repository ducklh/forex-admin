import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IFeature } from 'app/entities/feature/feature.model';
import { FeatureService } from 'app/entities/feature/service/feature.service';
import { IPlatform } from 'app/entities/platform/platform.model';
import { PlatformService } from 'app/entities/platform/service/platform.service';
import { IInstrument } from 'app/entities/instrument/instrument.model';
import { InstrumentService } from 'app/entities/instrument/service/instrument.service';
import { IPro } from 'app/entities/pro/pro.model';
import { ProService } from 'app/entities/pro/service/pro.service';
import { ICon } from 'app/entities/con/con.model';
import { ConService } from 'app/entities/con/service/con.service';
import { ILanguageSupport } from 'app/entities/language-support/language-support.model';
import { LanguageSupportService } from 'app/entities/language-support/service/language-support.service';
import { ISupport } from 'app/entities/support/support.model';
import { SupportService } from 'app/entities/support/service/support.service';
import { IPaymentMethod } from 'app/entities/payment-method/payment-method.model';
import { PaymentMethodService } from 'app/entities/payment-method/service/payment-method.service';
import { ForexBrokerService } from '../service/forex-broker.service';
import { IForexBroker } from '../forex-broker.model';
import { ForexBrokerFormGroup, ForexBrokerFormService } from './forex-broker-form.service';

@Component({
  selector: 'jhi-forex-broker-update',
  templateUrl: './forex-broker-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ForexBrokerUpdateComponent implements OnInit {
  isSaving = false;
  forexBroker: IForexBroker | null = null;

  featuresSharedCollection: IFeature[] = [];
  platformsSharedCollection: IPlatform[] = [];
  instrumentsSharedCollection: IInstrument[] = [];
  prosSharedCollection: IPro[] = [];
  consSharedCollection: ICon[] = [];
  languageSupportsSharedCollection: ILanguageSupport[] = [];
  supportsSharedCollection: ISupport[] = [];
  paymentMethodsSharedCollection: IPaymentMethod[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected forexBrokerService = inject(ForexBrokerService);
  protected forexBrokerFormService = inject(ForexBrokerFormService);
  protected featureService = inject(FeatureService);
  protected platformService = inject(PlatformService);
  protected instrumentService = inject(InstrumentService);
  protected proService = inject(ProService);
  protected conService = inject(ConService);
  protected languageSupportService = inject(LanguageSupportService);
  protected supportService = inject(SupportService);
  protected paymentMethodService = inject(PaymentMethodService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ForexBrokerFormGroup = this.forexBrokerFormService.createForexBrokerFormGroup();

  compareFeature = (o1: IFeature | null, o2: IFeature | null): boolean => this.featureService.compareFeature(o1, o2);

  comparePlatform = (o1: IPlatform | null, o2: IPlatform | null): boolean => this.platformService.comparePlatform(o1, o2);

  compareInstrument = (o1: IInstrument | null, o2: IInstrument | null): boolean => this.instrumentService.compareInstrument(o1, o2);

  comparePro = (o1: IPro | null, o2: IPro | null): boolean => this.proService.comparePro(o1, o2);

  compareCon = (o1: ICon | null, o2: ICon | null): boolean => this.conService.compareCon(o1, o2);

  compareLanguageSupport = (o1: ILanguageSupport | null, o2: ILanguageSupport | null): boolean =>
    this.languageSupportService.compareLanguageSupport(o1, o2);

  compareSupport = (o1: ISupport | null, o2: ISupport | null): boolean => this.supportService.compareSupport(o1, o2);

  comparePaymentMethod = (o1: IPaymentMethod | null, o2: IPaymentMethod | null): boolean =>
    this.paymentMethodService.comparePaymentMethod(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ forexBroker }) => {
      this.forexBroker = forexBroker;
      if (forexBroker) {
        this.updateForm(forexBroker);
      }

      this.loadRelationshipsOptions();
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
        this.eventManager.broadcast(new EventWithContent<AlertError>('kNetworkAdminApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const forexBroker = this.forexBrokerFormService.getForexBroker(this.editForm);
    if (forexBroker.id !== null) {
      this.subscribeToSaveResponse(this.forexBrokerService.update(forexBroker));
    } else {
      this.subscribeToSaveResponse(this.forexBrokerService.create(forexBroker));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IForexBroker>>): void {
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

  protected updateForm(forexBroker: IForexBroker): void {
    this.forexBroker = forexBroker;
    this.forexBrokerFormService.resetForm(this.editForm, forexBroker);

    this.featuresSharedCollection = this.featureService.addFeatureToCollectionIfMissing<IFeature>(
      this.featuresSharedCollection,
      ...(forexBroker.forexFeatures ?? []),
    );
    this.platformsSharedCollection = this.platformService.addPlatformToCollectionIfMissing<IPlatform>(
      this.platformsSharedCollection,
      ...(forexBroker.forexPlatforms ?? []),
    );
    this.instrumentsSharedCollection = this.instrumentService.addInstrumentToCollectionIfMissing<IInstrument>(
      this.instrumentsSharedCollection,
      ...(forexBroker.forexInstruments ?? []),
    );
    this.prosSharedCollection = this.proService.addProToCollectionIfMissing<IPro>(
      this.prosSharedCollection,
      ...(forexBroker.forexPros ?? []),
    );
    this.consSharedCollection = this.conService.addConToCollectionIfMissing<ICon>(
      this.consSharedCollection,
      ...(forexBroker.forexCons ?? []),
    );
    this.languageSupportsSharedCollection = this.languageSupportService.addLanguageSupportToCollectionIfMissing<ILanguageSupport>(
      this.languageSupportsSharedCollection,
      ...(forexBroker.forexLanguages ?? []),
    );
    this.supportsSharedCollection = this.supportService.addSupportToCollectionIfMissing<ISupport>(
      this.supportsSharedCollection,
      ...(forexBroker.forexSupports ?? []),
    );
    this.paymentMethodsSharedCollection = this.paymentMethodService.addPaymentMethodToCollectionIfMissing<IPaymentMethod>(
      this.paymentMethodsSharedCollection,
      ...(forexBroker.forexPaymentMethods ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.featureService
      .query()
      .pipe(map((res: HttpResponse<IFeature[]>) => res.body ?? []))
      .pipe(
        map((features: IFeature[]) =>
          this.featureService.addFeatureToCollectionIfMissing<IFeature>(features, ...(this.forexBroker?.forexFeatures ?? [])),
        ),
      )
      .subscribe((features: IFeature[]) => (this.featuresSharedCollection = features));

    this.platformService
      .query()
      .pipe(map((res: HttpResponse<IPlatform[]>) => res.body ?? []))
      .pipe(
        map((platforms: IPlatform[]) =>
          this.platformService.addPlatformToCollectionIfMissing<IPlatform>(platforms, ...(this.forexBroker?.forexPlatforms ?? [])),
        ),
      )
      .subscribe((platforms: IPlatform[]) => (this.platformsSharedCollection = platforms));

    this.instrumentService
      .query()
      .pipe(map((res: HttpResponse<IInstrument[]>) => res.body ?? []))
      .pipe(
        map((instruments: IInstrument[]) =>
          this.instrumentService.addInstrumentToCollectionIfMissing<IInstrument>(
            instruments,
            ...(this.forexBroker?.forexInstruments ?? []),
          ),
        ),
      )
      .subscribe((instruments: IInstrument[]) => (this.instrumentsSharedCollection = instruments));

    this.proService
      .query()
      .pipe(map((res: HttpResponse<IPro[]>) => res.body ?? []))
      .pipe(map((pros: IPro[]) => this.proService.addProToCollectionIfMissing<IPro>(pros, ...(this.forexBroker?.forexPros ?? []))))
      .subscribe((pros: IPro[]) => (this.prosSharedCollection = pros));

    this.conService
      .query()
      .pipe(map((res: HttpResponse<ICon[]>) => res.body ?? []))
      .pipe(map((cons: ICon[]) => this.conService.addConToCollectionIfMissing<ICon>(cons, ...(this.forexBroker?.forexCons ?? []))))
      .subscribe((cons: ICon[]) => (this.consSharedCollection = cons));

    this.languageSupportService
      .query()
      .pipe(map((res: HttpResponse<ILanguageSupport[]>) => res.body ?? []))
      .pipe(
        map((languageSupports: ILanguageSupport[]) =>
          this.languageSupportService.addLanguageSupportToCollectionIfMissing<ILanguageSupport>(
            languageSupports,
            ...(this.forexBroker?.forexLanguages ?? []),
          ),
        ),
      )
      .subscribe((languageSupports: ILanguageSupport[]) => (this.languageSupportsSharedCollection = languageSupports));

    this.supportService
      .query()
      .pipe(map((res: HttpResponse<ISupport[]>) => res.body ?? []))
      .pipe(
        map((supports: ISupport[]) =>
          this.supportService.addSupportToCollectionIfMissing<ISupport>(supports, ...(this.forexBroker?.forexSupports ?? [])),
        ),
      )
      .subscribe((supports: ISupport[]) => (this.supportsSharedCollection = supports));

    this.paymentMethodService
      .query()
      .pipe(map((res: HttpResponse<IPaymentMethod[]>) => res.body ?? []))
      .pipe(
        map((paymentMethods: IPaymentMethod[]) =>
          this.paymentMethodService.addPaymentMethodToCollectionIfMissing<IPaymentMethod>(
            paymentMethods,
            ...(this.forexBroker?.forexPaymentMethods ?? []),
          ),
        ),
      )
      .subscribe((paymentMethods: IPaymentMethod[]) => (this.paymentMethodsSharedCollection = paymentMethods));
  }
}
