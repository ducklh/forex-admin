import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPlatform, NewPlatform } from '../platform.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlatform for edit and NewPlatformFormGroupInput for create.
 */
type PlatformFormGroupInput = IPlatform | PartialWithRequiredKeyOf<NewPlatform>;

type PlatformFormDefaults = Pick<NewPlatform, 'id'>;

type PlatformFormGroupContent = {
  id: FormControl<IPlatform['id'] | NewPlatform['id']>;
  value: FormControl<IPlatform['value']>;
  valueEn: FormControl<IPlatform['valueEn']>;
};

export type PlatformFormGroup = FormGroup<PlatformFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlatformFormService {
  createPlatformFormGroup(platform: PlatformFormGroupInput = { id: null }): PlatformFormGroup {
    const platformRawValue = {
      ...this.getFormDefaults(),
      ...platform,
    };
    return new FormGroup<PlatformFormGroupContent>({
      id: new FormControl(
        { value: platformRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(platformRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(platformRawValue.valueEn),
    });
  }

  getPlatform(form: PlatformFormGroup): IPlatform | NewPlatform {
    return form.getRawValue() as IPlatform | NewPlatform;
  }

  resetForm(form: PlatformFormGroup, platform: PlatformFormGroupInput): void {
    const platformRawValue = { ...this.getFormDefaults(), ...platform };
    form.reset(
      {
        ...platformRawValue,
        id: { value: platformRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PlatformFormDefaults {
    return {
      id: null,
    };
  }
}
