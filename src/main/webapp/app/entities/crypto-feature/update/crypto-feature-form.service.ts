import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICryptoFeature, NewCryptoFeature } from '../crypto-feature.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICryptoFeature for edit and NewCryptoFeatureFormGroupInput for create.
 */
type CryptoFeatureFormGroupInput = ICryptoFeature | PartialWithRequiredKeyOf<NewCryptoFeature>;

type CryptoFeatureFormDefaults = Pick<NewCryptoFeature, 'id'>;

type CryptoFeatureFormGroupContent = {
  id: FormControl<ICryptoFeature['id'] | NewCryptoFeature['id']>;
  value: FormControl<ICryptoFeature['value']>;
  valueEn: FormControl<ICryptoFeature['valueEn']>;
};

export type CryptoFeatureFormGroup = FormGroup<CryptoFeatureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CryptoFeatureFormService {
  createCryptoFeatureFormGroup(cryptoFeature: CryptoFeatureFormGroupInput = { id: null }): CryptoFeatureFormGroup {
    const cryptoFeatureRawValue = {
      ...this.getFormDefaults(),
      ...cryptoFeature,
    };
    return new FormGroup<CryptoFeatureFormGroupContent>({
      id: new FormControl(
        { value: cryptoFeatureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(cryptoFeatureRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(cryptoFeatureRawValue.valueEn),
    });
  }

  getCryptoFeature(form: CryptoFeatureFormGroup): ICryptoFeature | NewCryptoFeature {
    return form.getRawValue() as ICryptoFeature | NewCryptoFeature;
  }

  resetForm(form: CryptoFeatureFormGroup, cryptoFeature: CryptoFeatureFormGroupInput): void {
    const cryptoFeatureRawValue = { ...this.getFormDefaults(), ...cryptoFeature };
    form.reset(
      {
        ...cryptoFeatureRawValue,
        id: { value: cryptoFeatureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CryptoFeatureFormDefaults {
    return {
      id: null,
    };
  }
}
