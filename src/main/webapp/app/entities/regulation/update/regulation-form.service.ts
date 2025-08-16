import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRegulation, NewRegulation } from '../regulation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRegulation for edit and NewRegulationFormGroupInput for create.
 */
type RegulationFormGroupInput = IRegulation | PartialWithRequiredKeyOf<NewRegulation>;

type RegulationFormDefaults = Pick<NewRegulation, 'id'>;

type RegulationFormGroupContent = {
  id: FormControl<IRegulation['id'] | NewRegulation['id']>;
  authority: FormControl<IRegulation['authority']>;
  broker: FormControl<IRegulation['broker']>;
};

export type RegulationFormGroup = FormGroup<RegulationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegulationFormService {
  createRegulationFormGroup(regulation: RegulationFormGroupInput = { id: null }): RegulationFormGroup {
    const regulationRawValue = {
      ...this.getFormDefaults(),
      ...regulation,
    };
    return new FormGroup<RegulationFormGroupContent>({
      id: new FormControl(
        { value: regulationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      authority: new FormControl(regulationRawValue.authority, {
        validators: [Validators.required],
      }),
      broker: new FormControl(regulationRawValue.broker),
    });
  }

  getRegulation(form: RegulationFormGroup): IRegulation | NewRegulation {
    return form.getRawValue() as IRegulation | NewRegulation;
  }

  resetForm(form: RegulationFormGroup, regulation: RegulationFormGroupInput): void {
    const regulationRawValue = { ...this.getFormDefaults(), ...regulation };
    form.reset(
      {
        ...regulationRawValue,
        id: { value: regulationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RegulationFormDefaults {
    return {
      id: null,
    };
  }
}
