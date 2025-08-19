import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISecurityFeature, NewSecurityFeature } from '../security-feature.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecurityFeature for edit and NewSecurityFeatureFormGroupInput for create.
 */
type SecurityFeatureFormGroupInput = ISecurityFeature | PartialWithRequiredKeyOf<NewSecurityFeature>;

type SecurityFeatureFormDefaults = Pick<NewSecurityFeature, 'id'>;

type SecurityFeatureFormGroupContent = {
  id: FormControl<ISecurityFeature['id'] | NewSecurityFeature['id']>;
  value: FormControl<ISecurityFeature['value']>;
  valueEn: FormControl<ISecurityFeature['valueEn']>;
};

export type SecurityFeatureFormGroup = FormGroup<SecurityFeatureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecurityFeatureFormService {
  createSecurityFeatureFormGroup(securityFeature: SecurityFeatureFormGroupInput = { id: null }): SecurityFeatureFormGroup {
    const securityFeatureRawValue = {
      ...this.getFormDefaults(),
      ...securityFeature,
    };
    return new FormGroup<SecurityFeatureFormGroupContent>({
      id: new FormControl(
        { value: securityFeatureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(securityFeatureRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(securityFeatureRawValue.valueEn),
    });
  }

  getSecurityFeature(form: SecurityFeatureFormGroup): ISecurityFeature | NewSecurityFeature {
    return form.getRawValue() as ISecurityFeature | NewSecurityFeature;
  }

  resetForm(form: SecurityFeatureFormGroup, securityFeature: SecurityFeatureFormGroupInput): void {
    const securityFeatureRawValue = { ...this.getFormDefaults(), ...securityFeature };
    form.reset(
      {
        ...securityFeatureRawValue,
        id: { value: securityFeatureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SecurityFeatureFormDefaults {
    return {
      id: null,
    };
  }
}
