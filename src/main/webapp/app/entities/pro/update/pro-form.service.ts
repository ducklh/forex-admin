import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPro, NewPro } from '../pro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPro for edit and NewProFormGroupInput for create.
 */
type ProFormGroupInput = IPro | PartialWithRequiredKeyOf<NewPro>;

type ProFormDefaults = Pick<NewPro, 'id'>;

type ProFormGroupContent = {
  id: FormControl<IPro['id'] | NewPro['id']>;
  text: FormControl<IPro['text']>;
  broker: FormControl<IPro['broker']>;
};

export type ProFormGroup = FormGroup<ProFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProFormService {
  createProFormGroup(pro: ProFormGroupInput = { id: null }): ProFormGroup {
    const proRawValue = {
      ...this.getFormDefaults(),
      ...pro,
    };
    return new FormGroup<ProFormGroupContent>({
      id: new FormControl(
        { value: proRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      text: new FormControl(proRawValue.text, {
        validators: [Validators.required],
      }),
      broker: new FormControl(proRawValue.broker),
    });
  }

  getPro(form: ProFormGroup): IPro | NewPro {
    return form.getRawValue() as IPro | NewPro;
  }

  resetForm(form: ProFormGroup, pro: ProFormGroupInput): void {
    const proRawValue = { ...this.getFormDefaults(), ...pro };
    form.reset(
      {
        ...proRawValue,
        id: { value: proRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProFormDefaults {
    return {
      id: null,
    };
  }
}
