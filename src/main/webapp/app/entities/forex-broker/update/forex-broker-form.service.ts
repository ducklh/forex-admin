import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IForexBroker, NewForexBroker } from '../forex-broker.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IForexBroker for edit and NewForexBrokerFormGroupInput for create.
 */
type ForexBrokerFormGroupInput = IForexBroker | PartialWithRequiredKeyOf<NewForexBroker>;

type ForexBrokerFormDefaults = Pick<
  NewForexBroker,
  | 'id'
  | 'forexFeatures'
  | 'forexPlatforms'
  | 'forexInstruments'
  | 'forexPros'
  | 'forexCons'
  | 'forexLanguages'
  | 'forexSupports'
  | 'forexPaymentMethods'
>;

type ForexBrokerFormGroupContent = {
  id: FormControl<IForexBroker['id'] | NewForexBroker['id']>;
  name: FormControl<IForexBroker['name']>;
  nameEn: FormControl<IForexBroker['nameEn']>;
  logo: FormControl<IForexBroker['logo']>;
  url: FormControl<IForexBroker['url']>;
  description: FormControl<IForexBroker['description']>;
  descriptionEn: FormControl<IForexBroker['descriptionEn']>;
  rating: FormControl<IForexBroker['rating']>;
  regulation: FormControl<IForexBroker['regulation']>;
  minDeposit: FormControl<IForexBroker['minDeposit']>;
  spreads: FormControl<IForexBroker['spreads']>;
  leverage: FormControl<IForexBroker['leverage']>;
  founded: FormControl<IForexBroker['founded']>;
  headquarters: FormControl<IForexBroker['headquarters']>;
  headquartersEn: FormControl<IForexBroker['headquartersEn']>;
  forexFeatures: FormControl<IForexBroker['forexFeatures']>;
  forexPlatforms: FormControl<IForexBroker['forexPlatforms']>;
  forexInstruments: FormControl<IForexBroker['forexInstruments']>;
  forexPros: FormControl<IForexBroker['forexPros']>;
  forexCons: FormControl<IForexBroker['forexCons']>;
  forexLanguages: FormControl<IForexBroker['forexLanguages']>;
  forexSupports: FormControl<IForexBroker['forexSupports']>;
  forexPaymentMethods: FormControl<IForexBroker['forexPaymentMethods']>;
};

export type ForexBrokerFormGroup = FormGroup<ForexBrokerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ForexBrokerFormService {
  createForexBrokerFormGroup(forexBroker: ForexBrokerFormGroupInput = { id: null }): ForexBrokerFormGroup {
    const forexBrokerRawValue = {
      ...this.getFormDefaults(),
      ...forexBroker,
    };
    return new FormGroup<ForexBrokerFormGroupContent>({
      id: new FormControl(
        { value: forexBrokerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(forexBrokerRawValue.name, {
        validators: [Validators.required],
      }),
      nameEn: new FormControl(forexBrokerRawValue.nameEn),
      logo: new FormControl(forexBrokerRawValue.logo),
      url: new FormControl(forexBrokerRawValue.url),
      description: new FormControl(forexBrokerRawValue.description),
      descriptionEn: new FormControl(forexBrokerRawValue.descriptionEn),
      rating: new FormControl(forexBrokerRawValue.rating),
      regulation: new FormControl(forexBrokerRawValue.regulation),
      minDeposit: new FormControl(forexBrokerRawValue.minDeposit),
      spreads: new FormControl(forexBrokerRawValue.spreads),
      leverage: new FormControl(forexBrokerRawValue.leverage),
      founded: new FormControl(forexBrokerRawValue.founded),
      headquarters: new FormControl(forexBrokerRawValue.headquarters),
      headquartersEn: new FormControl(forexBrokerRawValue.headquartersEn),
      forexFeatures: new FormControl(forexBrokerRawValue.forexFeatures ?? []),
      forexPlatforms: new FormControl(forexBrokerRawValue.forexPlatforms ?? []),
      forexInstruments: new FormControl(forexBrokerRawValue.forexInstruments ?? []),
      forexPros: new FormControl(forexBrokerRawValue.forexPros ?? []),
      forexCons: new FormControl(forexBrokerRawValue.forexCons ?? []),
      forexLanguages: new FormControl(forexBrokerRawValue.forexLanguages ?? []),
      forexSupports: new FormControl(forexBrokerRawValue.forexSupports ?? []),
      forexPaymentMethods: new FormControl(forexBrokerRawValue.forexPaymentMethods ?? []),
    });
  }

  getForexBroker(form: ForexBrokerFormGroup): IForexBroker | NewForexBroker {
    return form.getRawValue() as IForexBroker | NewForexBroker;
  }

  resetForm(form: ForexBrokerFormGroup, forexBroker: ForexBrokerFormGroupInput): void {
    const forexBrokerRawValue = { ...this.getFormDefaults(), ...forexBroker };
    form.reset(
      {
        ...forexBrokerRawValue,
        id: { value: forexBrokerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ForexBrokerFormDefaults {
    return {
      id: null,
      forexFeatures: [],
      forexPlatforms: [],
      forexInstruments: [],
      forexPros: [],
      forexCons: [],
      forexLanguages: [],
      forexSupports: [],
      forexPaymentMethods: [],
    };
  }
}
