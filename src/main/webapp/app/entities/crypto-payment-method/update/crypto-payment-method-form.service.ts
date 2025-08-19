import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICryptoPaymentMethod, NewCryptoPaymentMethod } from '../crypto-payment-method.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICryptoPaymentMethod for edit and NewCryptoPaymentMethodFormGroupInput for create.
 */
type CryptoPaymentMethodFormGroupInput = ICryptoPaymentMethod | PartialWithRequiredKeyOf<NewCryptoPaymentMethod>;

type CryptoPaymentMethodFormDefaults = Pick<NewCryptoPaymentMethod, 'id'>;

type CryptoPaymentMethodFormGroupContent = {
  id: FormControl<ICryptoPaymentMethod['id'] | NewCryptoPaymentMethod['id']>;
  value: FormControl<ICryptoPaymentMethod['value']>;
  valueEn: FormControl<ICryptoPaymentMethod['valueEn']>;
};

export type CryptoPaymentMethodFormGroup = FormGroup<CryptoPaymentMethodFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CryptoPaymentMethodFormService {
  createCryptoPaymentMethodFormGroup(cryptoPaymentMethod: CryptoPaymentMethodFormGroupInput = { id: null }): CryptoPaymentMethodFormGroup {
    const cryptoPaymentMethodRawValue = {
      ...this.getFormDefaults(),
      ...cryptoPaymentMethod,
    };
    return new FormGroup<CryptoPaymentMethodFormGroupContent>({
      id: new FormControl(
        { value: cryptoPaymentMethodRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(cryptoPaymentMethodRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(cryptoPaymentMethodRawValue.valueEn),
    });
  }

  getCryptoPaymentMethod(form: CryptoPaymentMethodFormGroup): ICryptoPaymentMethod | NewCryptoPaymentMethod {
    return form.getRawValue() as ICryptoPaymentMethod | NewCryptoPaymentMethod;
  }

  resetForm(form: CryptoPaymentMethodFormGroup, cryptoPaymentMethod: CryptoPaymentMethodFormGroupInput): void {
    const cryptoPaymentMethodRawValue = { ...this.getFormDefaults(), ...cryptoPaymentMethod };
    form.reset(
      {
        ...cryptoPaymentMethodRawValue,
        id: { value: cryptoPaymentMethodRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CryptoPaymentMethodFormDefaults {
    return {
      id: null,
    };
  }
}
