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

type CryptoBrokerFormDefaults = Pick<NewCryptoBroker, 'id' | 'mobileApp' | 'apiSupport'>;

type CryptoBrokerFormGroupContent = {
  id: FormControl<ICryptoBroker['id'] | NewCryptoBroker['id']>;
  name: FormControl<ICryptoBroker['name']>;
  logo: FormControl<ICryptoBroker['logo']>;
  url: FormControl<ICryptoBroker['url']>;
  description: FormControl<ICryptoBroker['description']>;
  rating: FormControl<ICryptoBroker['rating']>;
  features: FormControl<ICryptoBroker['features']>;
  regulation: FormControl<ICryptoBroker['regulation']>;
  minDeposit: FormControl<ICryptoBroker['minDeposit']>;
  tradingFees: FormControl<ICryptoBroker['tradingFees']>;
  supportedCoins: FormControl<ICryptoBroker['supportedCoins']>;
  pros: FormControl<ICryptoBroker['pros']>;
  cons: FormControl<ICryptoBroker['cons']>;
  founded: FormControl<ICryptoBroker['founded']>;
  headquarters: FormControl<ICryptoBroker['headquarters']>;
  tradingVolume: FormControl<ICryptoBroker['tradingVolume']>;
  securityFeatures: FormControl<ICryptoBroker['securityFeatures']>;
  paymentMethods: FormControl<ICryptoBroker['paymentMethods']>;
  customerSupport: FormControl<ICryptoBroker['customerSupport']>;
  mobileApp: FormControl<ICryptoBroker['mobileApp']>;
  apiSupport: FormControl<ICryptoBroker['apiSupport']>;
  detailedDescription: FormControl<ICryptoBroker['detailedDescription']>;
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
      logo: new FormControl(cryptoBrokerRawValue.logo),
      url: new FormControl(cryptoBrokerRawValue.url),
      description: new FormControl(cryptoBrokerRawValue.description, {
        validators: [Validators.maxLength(500)],
      }),
      rating: new FormControl(cryptoBrokerRawValue.rating),
      features: new FormControl(cryptoBrokerRawValue.features),
      regulation: new FormControl(cryptoBrokerRawValue.regulation),
      minDeposit: new FormControl(cryptoBrokerRawValue.minDeposit),
      tradingFees: new FormControl(cryptoBrokerRawValue.tradingFees),
      supportedCoins: new FormControl(cryptoBrokerRawValue.supportedCoins),
      pros: new FormControl(cryptoBrokerRawValue.pros),
      cons: new FormControl(cryptoBrokerRawValue.cons),
      founded: new FormControl(cryptoBrokerRawValue.founded),
      headquarters: new FormControl(cryptoBrokerRawValue.headquarters),
      tradingVolume: new FormControl(cryptoBrokerRawValue.tradingVolume),
      securityFeatures: new FormControl(cryptoBrokerRawValue.securityFeatures),
      paymentMethods: new FormControl(cryptoBrokerRawValue.paymentMethods),
      customerSupport: new FormControl(cryptoBrokerRawValue.customerSupport),
      mobileApp: new FormControl(cryptoBrokerRawValue.mobileApp),
      apiSupport: new FormControl(cryptoBrokerRawValue.apiSupport),
      detailedDescription: new FormControl(cryptoBrokerRawValue.detailedDescription),
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
    };
  }
}
