import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILanguageSupport, NewLanguageSupport } from '../language-support.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILanguageSupport for edit and NewLanguageSupportFormGroupInput for create.
 */
type LanguageSupportFormGroupInput = ILanguageSupport | PartialWithRequiredKeyOf<NewLanguageSupport>;

type LanguageSupportFormDefaults = Pick<NewLanguageSupport, 'id'>;

type LanguageSupportFormGroupContent = {
  id: FormControl<ILanguageSupport['id'] | NewLanguageSupport['id']>;
  value: FormControl<ILanguageSupport['value']>;
  valueEn: FormControl<ILanguageSupport['valueEn']>;
};

export type LanguageSupportFormGroup = FormGroup<LanguageSupportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LanguageSupportFormService {
  createLanguageSupportFormGroup(languageSupport: LanguageSupportFormGroupInput = { id: null }): LanguageSupportFormGroup {
    const languageSupportRawValue = {
      ...this.getFormDefaults(),
      ...languageSupport,
    };
    return new FormGroup<LanguageSupportFormGroupContent>({
      id: new FormControl(
        { value: languageSupportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(languageSupportRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(languageSupportRawValue.valueEn),
    });
  }

  getLanguageSupport(form: LanguageSupportFormGroup): ILanguageSupport | NewLanguageSupport {
    return form.getRawValue() as ILanguageSupport | NewLanguageSupport;
  }

  resetForm(form: LanguageSupportFormGroup, languageSupport: LanguageSupportFormGroupInput): void {
    const languageSupportRawValue = { ...this.getFormDefaults(), ...languageSupport };
    form.reset(
      {
        ...languageSupportRawValue,
        id: { value: languageSupportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LanguageSupportFormDefaults {
    return {
      id: null,
    };
  }
}
