import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IInstrument, NewInstrument } from '../instrument.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstrument for edit and NewInstrumentFormGroupInput for create.
 */
type InstrumentFormGroupInput = IInstrument | PartialWithRequiredKeyOf<NewInstrument>;

type InstrumentFormDefaults = Pick<NewInstrument, 'id'>;

type InstrumentFormGroupContent = {
  id: FormControl<IInstrument['id'] | NewInstrument['id']>;
  value: FormControl<IInstrument['value']>;
  valueEn: FormControl<IInstrument['valueEn']>;
};

export type InstrumentFormGroup = FormGroup<InstrumentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstrumentFormService {
  createInstrumentFormGroup(instrument: InstrumentFormGroupInput = { id: null }): InstrumentFormGroup {
    const instrumentRawValue = {
      ...this.getFormDefaults(),
      ...instrument,
    };
    return new FormGroup<InstrumentFormGroupContent>({
      id: new FormControl(
        { value: instrumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(instrumentRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(instrumentRawValue.valueEn),
    });
  }

  getInstrument(form: InstrumentFormGroup): IInstrument | NewInstrument {
    return form.getRawValue() as IInstrument | NewInstrument;
  }

  resetForm(form: InstrumentFormGroup, instrument: InstrumentFormGroupInput): void {
    const instrumentRawValue = { ...this.getFormDefaults(), ...instrument };
    form.reset(
      {
        ...instrumentRawValue,
        id: { value: instrumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InstrumentFormDefaults {
    return {
      id: null,
    };
  }
}
