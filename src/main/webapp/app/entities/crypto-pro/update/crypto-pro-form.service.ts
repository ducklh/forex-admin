import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICryptoPro, NewCryptoPro } from '../crypto-pro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICryptoPro for edit and NewCryptoProFormGroupInput for create.
 */
type CryptoProFormGroupInput = ICryptoPro | PartialWithRequiredKeyOf<NewCryptoPro>;

type CryptoProFormDefaults = Pick<NewCryptoPro, 'id'>;

type CryptoProFormGroupContent = {
  id: FormControl<ICryptoPro['id'] | NewCryptoPro['id']>;
  value: FormControl<ICryptoPro['value']>;
  valueEn: FormControl<ICryptoPro['valueEn']>;
};

export type CryptoProFormGroup = FormGroup<CryptoProFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CryptoProFormService {
  createCryptoProFormGroup(cryptoPro: CryptoProFormGroupInput = { id: null }): CryptoProFormGroup {
    const cryptoProRawValue = {
      ...this.getFormDefaults(),
      ...cryptoPro,
    };
    return new FormGroup<CryptoProFormGroupContent>({
      id: new FormControl(
        { value: cryptoProRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(cryptoProRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(cryptoProRawValue.valueEn),
    });
  }

  getCryptoPro(form: CryptoProFormGroup): ICryptoPro | NewCryptoPro {
    return form.getRawValue() as ICryptoPro | NewCryptoPro;
  }

  resetForm(form: CryptoProFormGroup, cryptoPro: CryptoProFormGroupInput): void {
    const cryptoProRawValue = { ...this.getFormDefaults(), ...cryptoPro };
    form.reset(
      {
        ...cryptoProRawValue,
        id: { value: cryptoProRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CryptoProFormDefaults {
    return {
      id: null,
    };
  }
}
