import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICryptoBroker, NewCryptoBroker } from '../crypto-broker.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICryptoBroker for edit and NewCryptoBrokerFormGroupInput for create.
 */
type CryptoBrokerFormGroupInput = ICryptoBroker | PartialWithRequiredKeyOf<NewCryptoBroker>;

type CryptoBrokerFormDefaults = Pick<
  NewCryptoBroker,
  | 'id'
  | 'mobileApp'
  | 'apiSupport'
  | 'cryptoFeatures'
  | 'supportedCoins'
  | 'cryptoPros'
  | 'cryptoCons'
  | 'securityFeatures'
  | 'paymentMethods'
  | 'customerSupports'
>;

type CryptoBrokerFormGroupContent = {
  id: FormControl<ICryptoBroker['id'] | NewCryptoBroker['id']>;
  name: FormControl<ICryptoBroker['name']>;
  nameEn: FormControl<ICryptoBroker['nameEn']>;
  logo: FormControl<ICryptoBroker['logo']>;
  url: FormControl<ICryptoBroker['url']>;
  description: FormControl<ICryptoBroker['description']>;
  descriptionEn: FormControl<ICryptoBroker['descriptionEn']>;
  rating: FormControl<ICryptoBroker['rating']>;
  regulation: FormControl<ICryptoBroker['regulation']>;
  minDeposit: FormControl<ICryptoBroker['minDeposit']>;
  tradingFees: FormControl<ICryptoBroker['tradingFees']>;
  founded: FormControl<ICryptoBroker['founded']>;
  headquarters: FormControl<ICryptoBroker['headquarters']>;
  headquartersEn: FormControl<ICryptoBroker['headquartersEn']>;
  tradingVolume: FormControl<ICryptoBroker['tradingVolume']>;
  mobileApp: FormControl<ICryptoBroker['mobileApp']>;
  apiSupport: FormControl<ICryptoBroker['apiSupport']>;
  detailedDescription: FormControl<ICryptoBroker['detailedDescription']>;
  detailedDescriptionEn: FormControl<ICryptoBroker['detailedDescriptionEn']>;
  cryptoFeatures: FormControl<ICryptoBroker['cryptoFeatures']>;
  supportedCoins: FormControl<ICryptoBroker['supportedCoins']>;
  cryptoPros: FormControl<ICryptoBroker['cryptoPros']>;
  cryptoCons: FormControl<ICryptoBroker['cryptoCons']>;
  securityFeatures: FormControl<ICryptoBroker['securityFeatures']>;
  paymentMethods: FormControl<ICryptoBroker['paymentMethods']>;
  customerSupports: FormControl<ICryptoBroker['customerSupports']>;
};

export type CryptoBrokerFormGroup = FormGroup<CryptoBrokerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CryptoBrokerFormService {
  createCryptoBrokerFormGroup(cryptoBroker: CryptoBrokerFormGroupInput = { id: null }): CryptoBrokerFormGroup {
    const cryptoBrokerRawValue = {
      ...this.getFormDefaults(),
      ...cryptoBroker,
    };
    return new FormGroup<CryptoBrokerFormGroupContent>({
      id: new FormControl(
        { value: cryptoBrokerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(cryptoBrokerRawValue.name, {
        validators: [Validators.required],
      }),
      nameEn: new FormControl(cryptoBrokerRawValue.nameEn),
      logo: new FormControl(cryptoBrokerRawValue.logo),
      url: new FormControl(cryptoBrokerRawValue.url),
      description: new FormControl(cryptoBrokerRawValue.description),
      descriptionEn: new FormControl(cryptoBrokerRawValue.descriptionEn),
      rating: new FormControl(cryptoBrokerRawValue.rating),
      regulation: new FormControl(cryptoBrokerRawValue.regulation),
      minDeposit: new FormControl(cryptoBrokerRawValue.minDeposit),
      tradingFees: new FormControl(cryptoBrokerRawValue.tradingFees),
      founded: new FormControl(cryptoBrokerRawValue.founded),
      headquarters: new FormControl(cryptoBrokerRawValue.headquarters),
      headquartersEn: new FormControl(cryptoBrokerRawValue.headquartersEn),
      tradingVolume: new FormControl(cryptoBrokerRawValue.tradingVolume),
      mobileApp: new FormControl(cryptoBrokerRawValue.mobileApp),
      apiSupport: new FormControl(cryptoBrokerRawValue.apiSupport),
      detailedDescription: new FormControl(cryptoBrokerRawValue.detailedDescription),
      detailedDescriptionEn: new FormControl(cryptoBrokerRawValue.detailedDescriptionEn),
      cryptoFeatures: new FormControl(cryptoBrokerRawValue.cryptoFeatures ?? []),
      supportedCoins: new FormControl(cryptoBrokerRawValue.supportedCoins ?? []),
      cryptoPros: new FormControl(cryptoBrokerRawValue.cryptoPros ?? []),
      cryptoCons: new FormControl(cryptoBrokerRawValue.cryptoCons ?? []),
      securityFeatures: new FormControl(cryptoBrokerRawValue.securityFeatures ?? []),
      paymentMethods: new FormControl(cryptoBrokerRawValue.paymentMethods ?? []),
      customerSupports: new FormControl(cryptoBrokerRawValue.customerSupports ?? []),
    });
  }

  getCryptoBroker(form: CryptoBrokerFormGroup): ICryptoBroker | NewCryptoBroker {
    return form.getRawValue() as ICryptoBroker | NewCryptoBroker;
  }

  resetForm(form: CryptoBrokerFormGroup, cryptoBroker: CryptoBrokerFormGroupInput): void {
    const cryptoBrokerRawValue = { ...this.getFormDefaults(), ...cryptoBroker };
    form.reset(
      {
        ...cryptoBrokerRawValue,
        id: { value: cryptoBrokerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CryptoBrokerFormDefaults {
    return {
      id: null,
      mobileApp: false,
      apiSupport: false,
      cryptoFeatures: [],
      supportedCoins: [],
      cryptoPros: [],
      cryptoCons: [],
      securityFeatures: [],
      paymentMethods: [],
      customerSupports: [],
    };
  }
}
