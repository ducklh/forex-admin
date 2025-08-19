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
import { ICryptoFeature } from 'app/entities/crypto-feature/crypto-feature.model';
import { CryptoFeatureService } from 'app/entities/crypto-feature/service/crypto-feature.service';
import { ICoin } from 'app/entities/coin/coin.model';
import { CoinService } from 'app/entities/coin/service/coin.service';
import { ICryptoPro } from 'app/entities/crypto-pro/crypto-pro.model';
import { CryptoProService } from 'app/entities/crypto-pro/service/crypto-pro.service';
import { ICryptoCon } from 'app/entities/crypto-con/crypto-con.model';
import { CryptoConService } from 'app/entities/crypto-con/service/crypto-con.service';
import { ISecurityFeature } from 'app/entities/security-feature/security-feature.model';
import { SecurityFeatureService } from 'app/entities/security-feature/service/security-feature.service';
import { ICryptoPaymentMethod } from 'app/entities/crypto-payment-method/crypto-payment-method.model';
import { CryptoPaymentMethodService } from 'app/entities/crypto-payment-method/service/crypto-payment-method.service';
import { ICustomerSupport } from 'app/entities/customer-support/customer-support.model';
import { CustomerSupportService } from 'app/entities/customer-support/service/customer-support.service';
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

  cryptoFeaturesSharedCollection: ICryptoFeature[] = [];
  coinsSharedCollection: ICoin[] = [];
  cryptoProsSharedCollection: ICryptoPro[] = [];
  cryptoConsSharedCollection: ICryptoCon[] = [];
  securityFeaturesSharedCollection: ISecurityFeature[] = [];
  cryptoPaymentMethodsSharedCollection: ICryptoPaymentMethod[] = [];
  customerSupportsSharedCollection: ICustomerSupport[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected cryptoBrokerService = inject(CryptoBrokerService);
  protected cryptoBrokerFormService = inject(CryptoBrokerFormService);
  protected cryptoFeatureService = inject(CryptoFeatureService);
  protected coinService = inject(CoinService);
  protected cryptoProService = inject(CryptoProService);
  protected cryptoConService = inject(CryptoConService);
  protected securityFeatureService = inject(SecurityFeatureService);
  protected cryptoPaymentMethodService = inject(CryptoPaymentMethodService);
  protected customerSupportService = inject(CustomerSupportService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CryptoBrokerFormGroup = this.cryptoBrokerFormService.createCryptoBrokerFormGroup();

  compareCryptoFeature = (o1: ICryptoFeature | null, o2: ICryptoFeature | null): boolean =>
    this.cryptoFeatureService.compareCryptoFeature(o1, o2);

  compareCoin = (o1: ICoin | null, o2: ICoin | null): boolean => this.coinService.compareCoin(o1, o2);

  compareCryptoPro = (o1: ICryptoPro | null, o2: ICryptoPro | null): boolean => this.cryptoProService.compareCryptoPro(o1, o2);

  compareCryptoCon = (o1: ICryptoCon | null, o2: ICryptoCon | null): boolean => this.cryptoConService.compareCryptoCon(o1, o2);

  compareSecurityFeature = (o1: ISecurityFeature | null, o2: ISecurityFeature | null): boolean =>
    this.securityFeatureService.compareSecurityFeature(o1, o2);

  compareCryptoPaymentMethod = (o1: ICryptoPaymentMethod | null, o2: ICryptoPaymentMethod | null): boolean =>
    this.cryptoPaymentMethodService.compareCryptoPaymentMethod(o1, o2);

  compareCustomerSupport = (o1: ICustomerSupport | null, o2: ICustomerSupport | null): boolean =>
    this.customerSupportService.compareCustomerSupport(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cryptoBroker }) => {
      this.cryptoBroker = cryptoBroker;
      if (cryptoBroker) {
        this.updateForm(cryptoBroker);
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

    this.cryptoFeaturesSharedCollection = this.cryptoFeatureService.addCryptoFeatureToCollectionIfMissing<ICryptoFeature>(
      this.cryptoFeaturesSharedCollection,
      ...(cryptoBroker.cryptoFeatures ?? []),
    );
    this.coinsSharedCollection = this.coinService.addCoinToCollectionIfMissing<ICoin>(
      this.coinsSharedCollection,
      ...(cryptoBroker.supportedCoins ?? []),
    );
    this.cryptoProsSharedCollection = this.cryptoProService.addCryptoProToCollectionIfMissing<ICryptoPro>(
      this.cryptoProsSharedCollection,
      ...(cryptoBroker.cryptoPros ?? []),
    );
    this.cryptoConsSharedCollection = this.cryptoConService.addCryptoConToCollectionIfMissing<ICryptoCon>(
      this.cryptoConsSharedCollection,
      ...(cryptoBroker.cryptoCons ?? []),
    );
    this.securityFeaturesSharedCollection = this.securityFeatureService.addSecurityFeatureToCollectionIfMissing<ISecurityFeature>(
      this.securityFeaturesSharedCollection,
      ...(cryptoBroker.securityFeatures ?? []),
    );
    this.cryptoPaymentMethodsSharedCollection =
      this.cryptoPaymentMethodService.addCryptoPaymentMethodToCollectionIfMissing<ICryptoPaymentMethod>(
        this.cryptoPaymentMethodsSharedCollection,
        ...(cryptoBroker.paymentMethods ?? []),
      );
    this.customerSupportsSharedCollection = this.customerSupportService.addCustomerSupportToCollectionIfMissing<ICustomerSupport>(
      this.customerSupportsSharedCollection,
      ...(cryptoBroker.customerSupports ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cryptoFeatureService
      .query()
      .pipe(map((res: HttpResponse<ICryptoFeature[]>) => res.body ?? []))
      .pipe(
        map((cryptoFeatures: ICryptoFeature[]) =>
          this.cryptoFeatureService.addCryptoFeatureToCollectionIfMissing<ICryptoFeature>(
            cryptoFeatures,
            ...(this.cryptoBroker?.cryptoFeatures ?? []),
          ),
        ),
      )
      .subscribe((cryptoFeatures: ICryptoFeature[]) => (this.cryptoFeaturesSharedCollection = cryptoFeatures));

    this.coinService
      .query()
      .pipe(map((res: HttpResponse<ICoin[]>) => res.body ?? []))
      .pipe(
        map((coins: ICoin[]) => this.coinService.addCoinToCollectionIfMissing<ICoin>(coins, ...(this.cryptoBroker?.supportedCoins ?? []))),
      )
      .subscribe((coins: ICoin[]) => (this.coinsSharedCollection = coins));

    this.cryptoProService
      .query()
      .pipe(map((res: HttpResponse<ICryptoPro[]>) => res.body ?? []))
      .pipe(
        map((cryptoPros: ICryptoPro[]) =>
          this.cryptoProService.addCryptoProToCollectionIfMissing<ICryptoPro>(cryptoPros, ...(this.cryptoBroker?.cryptoPros ?? [])),
        ),
      )
      .subscribe((cryptoPros: ICryptoPro[]) => (this.cryptoProsSharedCollection = cryptoPros));

    this.cryptoConService
      .query()
      .pipe(map((res: HttpResponse<ICryptoCon[]>) => res.body ?? []))
      .pipe(
        map((cryptoCons: ICryptoCon[]) =>
          this.cryptoConService.addCryptoConToCollectionIfMissing<ICryptoCon>(cryptoCons, ...(this.cryptoBroker?.cryptoCons ?? [])),
        ),
      )
      .subscribe((cryptoCons: ICryptoCon[]) => (this.cryptoConsSharedCollection = cryptoCons));

    this.securityFeatureService
      .query()
      .pipe(map((res: HttpResponse<ISecurityFeature[]>) => res.body ?? []))
      .pipe(
        map((securityFeatures: ISecurityFeature[]) =>
          this.securityFeatureService.addSecurityFeatureToCollectionIfMissing<ISecurityFeature>(
            securityFeatures,
            ...(this.cryptoBroker?.securityFeatures ?? []),
          ),
        ),
      )
      .subscribe((securityFeatures: ISecurityFeature[]) => (this.securityFeaturesSharedCollection = securityFeatures));

    this.cryptoPaymentMethodService
      .query()
      .pipe(map((res: HttpResponse<ICryptoPaymentMethod[]>) => res.body ?? []))
      .pipe(
        map((cryptoPaymentMethods: ICryptoPaymentMethod[]) =>
          this.cryptoPaymentMethodService.addCryptoPaymentMethodToCollectionIfMissing<ICryptoPaymentMethod>(
            cryptoPaymentMethods,
            ...(this.cryptoBroker?.paymentMethods ?? []),
          ),
        ),
      )
      .subscribe((cryptoPaymentMethods: ICryptoPaymentMethod[]) => (this.cryptoPaymentMethodsSharedCollection = cryptoPaymentMethods));

    this.customerSupportService
      .query()
      .pipe(map((res: HttpResponse<ICustomerSupport[]>) => res.body ?? []))
      .pipe(
        map((customerSupports: ICustomerSupport[]) =>
          this.customerSupportService.addCustomerSupportToCollectionIfMissing<ICustomerSupport>(
            customerSupports,
            ...(this.cryptoBroker?.customerSupports ?? []),
          ),
        ),
      )
      .subscribe((customerSupports: ICustomerSupport[]) => (this.customerSupportsSharedCollection = customerSupports));
  }
}
