import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISupport, NewSupport } from '../support.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISupport for edit and NewSupportFormGroupInput for create.
 */
type SupportFormGroupInput = ISupport | PartialWithRequiredKeyOf<NewSupport>;

type SupportFormDefaults = Pick<NewSupport, 'id'>;

type SupportFormGroupContent = {
  id: FormControl<ISupport['id'] | NewSupport['id']>;
  value: FormControl<ISupport['value']>;
  valueEn: FormControl<ISupport['valueEn']>;
};

export type SupportFormGroup = FormGroup<SupportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SupportFormService {
  createSupportFormGroup(support: SupportFormGroupInput = { id: null }): SupportFormGroup {
    const supportRawValue = {
      ...this.getFormDefaults(),
      ...support,
    };
    return new FormGroup<SupportFormGroupContent>({
      id: new FormControl(
        { value: supportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(supportRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(supportRawValue.valueEn),
    });
  }

  getSupport(form: SupportFormGroup): ISupport | NewSupport {
    return form.getRawValue() as ISupport | NewSupport;
  }

  resetForm(form: SupportFormGroup, support: SupportFormGroupInput): void {
    const supportRawValue = { ...this.getFormDefaults(), ...support };
    form.reset(
      {
        ...supportRawValue,
        id: { value: supportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SupportFormDefaults {
    return {
      id: null,
    };
  }
}
