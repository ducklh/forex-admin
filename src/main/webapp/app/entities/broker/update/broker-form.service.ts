import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBroker, NewBroker } from '../broker.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBroker for edit and NewBrokerFormGroupInput for create.
 */
type BrokerFormGroupInput = IBroker | PartialWithRequiredKeyOf<NewBroker>;

type BrokerFormDefaults = Pick<NewBroker, 'id'>;

type BrokerFormGroupContent = {
  id: FormControl<IBroker['id'] | NewBroker['id']>;
  name: FormControl<IBroker['name']>;
  logo: FormControl<IBroker['logo']>;
  url: FormControl<IBroker['url']>;
  description: FormControl<IBroker['description']>;
  rating: FormControl<IBroker['rating']>;
  minDeposit: FormControl<IBroker['minDeposit']>;
  spreads: FormControl<IBroker['spreads']>;
  leverage: FormControl<IBroker['leverage']>;
  founded: FormControl<IBroker['founded']>;
  headquarters: FormControl<IBroker['headquarters']>;
};

export type BrokerFormGroup = FormGroup<BrokerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BrokerFormService {
  createBrokerFormGroup(broker: BrokerFormGroupInput = { id: null }): BrokerFormGroup {
    const brokerRawValue = {
      ...this.getFormDefaults(),
      ...broker,
    };
    return new FormGroup<BrokerFormGroupContent>({
      id: new FormControl(
        { value: brokerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(brokerRawValue.name, {
        validators: [Validators.required],
      }),
      logo: new FormControl(brokerRawValue.logo),
      url: new FormControl(brokerRawValue.url),
      description: new FormControl(brokerRawValue.description),
      rating: new FormControl(brokerRawValue.rating),
      minDeposit: new FormControl(brokerRawValue.minDeposit),
      spreads: new FormControl(brokerRawValue.spreads),
      leverage: new FormControl(brokerRawValue.leverage),
      founded: new FormControl(brokerRawValue.founded),
      headquarters: new FormControl(brokerRawValue.headquarters),
    });
  }

  getBroker(form: BrokerFormGroup): IBroker | NewBroker {
    return form.getRawValue() as IBroker | NewBroker;
  }

  resetForm(form: BrokerFormGroup, broker: BrokerFormGroupInput): void {
    const brokerRawValue = { ...this.getFormDefaults(), ...broker };
    form.reset(
      {
        ...brokerRawValue,
        id: { value: brokerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BrokerFormDefaults {
    return {
      id: null,
    };
  }
}
