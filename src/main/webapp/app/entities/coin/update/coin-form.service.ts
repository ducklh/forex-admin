import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICoin, NewCoin } from '../coin.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICoin for edit and NewCoinFormGroupInput for create.
 */
type CoinFormGroupInput = ICoin | PartialWithRequiredKeyOf<NewCoin>;

type CoinFormDefaults = Pick<NewCoin, 'id'>;

type CoinFormGroupContent = {
  id: FormControl<ICoin['id'] | NewCoin['id']>;
  value: FormControl<ICoin['value']>;
  valueEn: FormControl<ICoin['valueEn']>;
};

export type CoinFormGroup = FormGroup<CoinFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CoinFormService {
  createCoinFormGroup(coin: CoinFormGroupInput = { id: null }): CoinFormGroup {
    const coinRawValue = {
      ...this.getFormDefaults(),
      ...coin,
    };
    return new FormGroup<CoinFormGroupContent>({
      id: new FormControl(
        { value: coinRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(coinRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(coinRawValue.valueEn),
    });
  }

  getCoin(form: CoinFormGroup): ICoin | NewCoin {
    return form.getRawValue() as ICoin | NewCoin;
  }

  resetForm(form: CoinFormGroup, coin: CoinFormGroupInput): void {
    const coinRawValue = { ...this.getFormDefaults(), ...coin };
    form.reset(
      {
        ...coinRawValue,
        id: { value: coinRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CoinFormDefaults {
    return {
      id: null,
    };
  }
}
