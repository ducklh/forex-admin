import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IKnowledgeTag, NewKnowledgeTag } from '../knowledge-tag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKnowledgeTag for edit and NewKnowledgeTagFormGroupInput for create.
 */
type KnowledgeTagFormGroupInput = IKnowledgeTag | PartialWithRequiredKeyOf<NewKnowledgeTag>;

type KnowledgeTagFormDefaults = Pick<NewKnowledgeTag, 'id'>;

type KnowledgeTagFormGroupContent = {
  id: FormControl<IKnowledgeTag['id'] | NewKnowledgeTag['id']>;
  value: FormControl<IKnowledgeTag['value']>;
  valueEn: FormControl<IKnowledgeTag['valueEn']>;
};

export type KnowledgeTagFormGroup = FormGroup<KnowledgeTagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KnowledgeTagFormService {
  createKnowledgeTagFormGroup(knowledgeTag: KnowledgeTagFormGroupInput = { id: null }): KnowledgeTagFormGroup {
    const knowledgeTagRawValue = {
      ...this.getFormDefaults(),
      ...knowledgeTag,
    };
    return new FormGroup<KnowledgeTagFormGroupContent>({
      id: new FormControl(
        { value: knowledgeTagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      value: new FormControl(knowledgeTagRawValue.value, {
        validators: [Validators.required],
      }),
      valueEn: new FormControl(knowledgeTagRawValue.valueEn),
    });
  }

  getKnowledgeTag(form: KnowledgeTagFormGroup): IKnowledgeTag | NewKnowledgeTag {
    return form.getRawValue() as IKnowledgeTag | NewKnowledgeTag;
  }

  resetForm(form: KnowledgeTagFormGroup, knowledgeTag: KnowledgeTagFormGroupInput): void {
    const knowledgeTagRawValue = { ...this.getFormDefaults(), ...knowledgeTag };
    form.reset(
      {
        ...knowledgeTagRawValue,
        id: { value: knowledgeTagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KnowledgeTagFormDefaults {
    return {
      id: null,
    };
  }
}
