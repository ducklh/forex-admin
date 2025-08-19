import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IKnowledgeItem, NewKnowledgeItem } from '../knowledge-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKnowledgeItem for edit and NewKnowledgeItemFormGroupInput for create.
 */
type KnowledgeItemFormGroupInput = IKnowledgeItem | PartialWithRequiredKeyOf<NewKnowledgeItem>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IKnowledgeItem | NewKnowledgeItem> = Omit<T, 'publishedAt'> & {
  publishedAt?: string | null;
};

type KnowledgeItemFormRawValue = FormValueOf<IKnowledgeItem>;

type NewKnowledgeItemFormRawValue = FormValueOf<NewKnowledgeItem>;

type KnowledgeItemFormDefaults = Pick<NewKnowledgeItem, 'id' | 'publishedAt' | 'tags'>;

type KnowledgeItemFormGroupContent = {
  id: FormControl<KnowledgeItemFormRawValue['id'] | NewKnowledgeItem['id']>;
  title: FormControl<KnowledgeItemFormRawValue['title']>;
  titleEn: FormControl<KnowledgeItemFormRawValue['titleEn']>;
  excerpt: FormControl<KnowledgeItemFormRawValue['excerpt']>;
  excerptEn: FormControl<KnowledgeItemFormRawValue['excerptEn']>;
  content: FormControl<KnowledgeItemFormRawValue['content']>;
  contentEn: FormControl<KnowledgeItemFormRawValue['contentEn']>;
  category: FormControl<KnowledgeItemFormRawValue['category']>;
  categoryEn: FormControl<KnowledgeItemFormRawValue['categoryEn']>;
  level: FormControl<KnowledgeItemFormRawValue['level']>;
  levelEn: FormControl<KnowledgeItemFormRawValue['levelEn']>;
  author: FormControl<KnowledgeItemFormRawValue['author']>;
  publishedAt: FormControl<KnowledgeItemFormRawValue['publishedAt']>;
  readTime: FormControl<KnowledgeItemFormRawValue['readTime']>;
  image: FormControl<KnowledgeItemFormRawValue['image']>;
  tags: FormControl<KnowledgeItemFormRawValue['tags']>;
};

export type KnowledgeItemFormGroup = FormGroup<KnowledgeItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KnowledgeItemFormService {
  createKnowledgeItemFormGroup(knowledgeItem: KnowledgeItemFormGroupInput = { id: null }): KnowledgeItemFormGroup {
    const knowledgeItemRawValue = this.convertKnowledgeItemToKnowledgeItemRawValue({
      ...this.getFormDefaults(),
      ...knowledgeItem,
    });
    return new FormGroup<KnowledgeItemFormGroupContent>({
      id: new FormControl(
        { value: knowledgeItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(knowledgeItemRawValue.title, {
        validators: [Validators.required],
      }),
      titleEn: new FormControl(knowledgeItemRawValue.titleEn),
      excerpt: new FormControl(knowledgeItemRawValue.excerpt),
      excerptEn: new FormControl(knowledgeItemRawValue.excerptEn),
      content: new FormControl(knowledgeItemRawValue.content),
      contentEn: new FormControl(knowledgeItemRawValue.contentEn),
      category: new FormControl(knowledgeItemRawValue.category),
      categoryEn: new FormControl(knowledgeItemRawValue.categoryEn),
      level: new FormControl(knowledgeItemRawValue.level),
      levelEn: new FormControl(knowledgeItemRawValue.levelEn),
      author: new FormControl(knowledgeItemRawValue.author),
      publishedAt: new FormControl(knowledgeItemRawValue.publishedAt),
      readTime: new FormControl(knowledgeItemRawValue.readTime),
      image: new FormControl(knowledgeItemRawValue.image),
      tags: new FormControl(knowledgeItemRawValue.tags ?? []),
    });
  }

  getKnowledgeItem(form: KnowledgeItemFormGroup): IKnowledgeItem | NewKnowledgeItem {
    return this.convertKnowledgeItemRawValueToKnowledgeItem(form.getRawValue() as KnowledgeItemFormRawValue | NewKnowledgeItemFormRawValue);
  }

  resetForm(form: KnowledgeItemFormGroup, knowledgeItem: KnowledgeItemFormGroupInput): void {
    const knowledgeItemRawValue = this.convertKnowledgeItemToKnowledgeItemRawValue({ ...this.getFormDefaults(), ...knowledgeItem });
    form.reset(
      {
        ...knowledgeItemRawValue,
        id: { value: knowledgeItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KnowledgeItemFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      publishedAt: currentTime,
      tags: [],
    };
  }

  private convertKnowledgeItemRawValueToKnowledgeItem(
    rawKnowledgeItem: KnowledgeItemFormRawValue | NewKnowledgeItemFormRawValue,
  ): IKnowledgeItem | NewKnowledgeItem {
    return {
      ...rawKnowledgeItem,
      publishedAt: dayjs(rawKnowledgeItem.publishedAt, DATE_TIME_FORMAT),
    };
  }

  private convertKnowledgeItemToKnowledgeItemRawValue(
    knowledgeItem: IKnowledgeItem | (Partial<NewKnowledgeItem> & KnowledgeItemFormDefaults),
  ): KnowledgeItemFormRawValue | PartialWithRequiredKeyOf<NewKnowledgeItemFormRawValue> {
    return {
      ...knowledgeItem,
      publishedAt: knowledgeItem.publishedAt ? knowledgeItem.publishedAt.format(DATE_TIME_FORMAT) : undefined,
      tags: knowledgeItem.tags ?? [],
    };
  }
}
