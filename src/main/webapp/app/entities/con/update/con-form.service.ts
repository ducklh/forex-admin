import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICon, NewCon } from '../con.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICon for edit and NewConFormGroupInput for create.
 */
type ConFormGroupInput = ICon | PartialWithRequiredKeyOf<NewCon>;

type ConFormDefaults = Pick<NewCon, 'id'>;

type ConFormGroupContent = {
  id: FormControl<ICon['id'] | NewCon['id']>;
  value: FormControl<ICon['value']>;
  valueEn: FormControl<ICon['valueEn']>;
};

export type ConFormGroup = FormGroup<ConFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConFormService {
  createConFormGroup(con: ConFormGroupInput = { id: null }): ConFormGroup {
    const conRawValue = {
      ...this.getFormDefaults(),
      ...con,
    };
    return new FormGroup<ConFormGroupContent>({
      id: new FormControl(
        { value: conRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(conRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(conRawValue.valueEn),
    });
  }

  getCon(form: ConFormGroup): ICon | NewCon {
    return form.getRawValue() as ICon | NewCon;
  }

  resetForm(form: ConFormGroup, con: ConFormGroupInput): void {
    const conRawValue = { ...this.getFormDefaults(), ...con };
    form.reset(
      {
        ...conRawValue,
        id: { value: conRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ConFormDefaults {
    return {
      id: null,
    };
  }
}
