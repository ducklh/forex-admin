import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICryptoCon, NewCryptoCon } from '../crypto-con.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICryptoCon for edit and NewCryptoConFormGroupInput for create.
 */
type CryptoConFormGroupInput = ICryptoCon | PartialWithRequiredKeyOf<NewCryptoCon>;

type CryptoConFormDefaults = Pick<NewCryptoCon, 'id'>;

type CryptoConFormGroupContent = {
  id: FormControl<ICryptoCon['id'] | NewCryptoCon['id']>;
  value: FormControl<ICryptoCon['value']>;
  valueEn: FormControl<ICryptoCon['valueEn']>;
};

export type CryptoConFormGroup = FormGroup<CryptoConFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CryptoConFormService {
  createCryptoConFormGroup(cryptoCon: CryptoConFormGroupInput = { id: null }): CryptoConFormGroup {
    const cryptoConRawValue = {
      ...this.getFormDefaults(),
      ...cryptoCon,
    };
    return new FormGroup<CryptoConFormGroupContent>({
      id: new FormControl(
        { value: cryptoConRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(cryptoConRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(cryptoConRawValue.valueEn),
    });
  }

  getCryptoCon(form: CryptoConFormGroup): ICryptoCon | NewCryptoCon {
    return form.getRawValue() as ICryptoCon | NewCryptoCon;
  }

  resetForm(form: CryptoConFormGroup, cryptoCon: CryptoConFormGroupInput): void {
    const cryptoConRawValue = { ...this.getFormDefaults(), ...cryptoCon };
    form.reset(
      {
        ...cryptoConRawValue,
        id: { value: cryptoConRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CryptoConFormDefaults {
    return {
      id: null,
    };
  }
}
