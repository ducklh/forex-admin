import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICustomerSupport, NewCustomerSupport } from '../customer-support.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerSupport for edit and NewCustomerSupportFormGroupInput for create.
 */
type CustomerSupportFormGroupInput = ICustomerSupport | PartialWithRequiredKeyOf<NewCustomerSupport>;

type CustomerSupportFormDefaults = Pick<NewCustomerSupport, 'id'>;

type CustomerSupportFormGroupContent = {
  id: FormControl<ICustomerSupport['id'] | NewCustomerSupport['id']>;
  value: FormControl<ICustomerSupport['value']>;
  valueEn: FormControl<ICustomerSupport['valueEn']>;
};

export type CustomerSupportFormGroup = FormGroup<CustomerSupportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerSupportFormService {
  createCustomerSupportFormGroup(customerSupport: CustomerSupportFormGroupInput = { id: null }): CustomerSupportFormGroup {
    const customerSupportRawValue = {
      ...this.getFormDefaults(),
      ...customerSupport,
    };
    return new FormGroup<CustomerSupportFormGroupContent>({
      id: new FormControl(
        { value: customerSupportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(customerSupportRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(customerSupportRawValue.valueEn),
    });
  }

  getCustomerSupport(form: CustomerSupportFormGroup): ICustomerSupport | NewCustomerSupport {
    return form.getRawValue() as ICustomerSupport | NewCustomerSupport;
  }

  resetForm(form: CustomerSupportFormGroup, customerSupport: CustomerSupportFormGroupInput): void {
    const customerSupportRawValue = { ...this.getFormDefaults(), ...customerSupport };
    form.reset(
      {
        ...customerSupportRawValue,
        id: { value: customerSupportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CustomerSupportFormDefaults {
    return {
      id: null,
    };
  }
}
