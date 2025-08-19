import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISiteNewsArticle, NewSiteNewsArticle } from '../site-news-article.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISiteNewsArticle for edit and NewSiteNewsArticleFormGroupInput for create.
 */
type SiteNewsArticleFormGroupInput = ISiteNewsArticle | PartialWithRequiredKeyOf<NewSiteNewsArticle>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISiteNewsArticle | NewSiteNewsArticle> = Omit<T, 'publishedAt'> & {
  publishedAt?: string | null;
};

type SiteNewsArticleFormRawValue = FormValueOf<ISiteNewsArticle>;

type NewSiteNewsArticleFormRawValue = FormValueOf<NewSiteNewsArticle>;

type SiteNewsArticleFormDefaults = Pick<NewSiteNewsArticle, 'id' | 'publishedAt' | 'tags'>;

type SiteNewsArticleFormGroupContent = {
  id: FormControl<SiteNewsArticleFormRawValue['id'] | NewSiteNewsArticle['id']>;
  title: FormControl<SiteNewsArticleFormRawValue['title']>;
  titleEn: FormControl<SiteNewsArticleFormRawValue['titleEn']>;
  excerpt: FormControl<SiteNewsArticleFormRawValue['excerpt']>;
  excerptEn: FormControl<SiteNewsArticleFormRawValue['excerptEn']>;
  content: FormControl<SiteNewsArticleFormRawValue['content']>;
  contentEn: FormControl<SiteNewsArticleFormRawValue['contentEn']>;
  category: FormControl<SiteNewsArticleFormRawValue['category']>;
  categoryEn: FormControl<SiteNewsArticleFormRawValue['categoryEn']>;
  author: FormControl<SiteNewsArticleFormRawValue['author']>;
  publishedAt: FormControl<SiteNewsArticleFormRawValue['publishedAt']>;
  readTime: FormControl<SiteNewsArticleFormRawValue['readTime']>;
  image: FormControl<SiteNewsArticleFormRawValue['image']>;
  fullContent: FormControl<SiteNewsArticleFormRawValue['fullContent']>;
  fullContentEn: FormControl<SiteNewsArticleFormRawValue['fullContentEn']>;
  tags: FormControl<SiteNewsArticleFormRawValue['tags']>;
};

export type SiteNewsArticleFormGroup = FormGroup<SiteNewsArticleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SiteNewsArticleFormService {
  createSiteNewsArticleFormGroup(siteNewsArticle: SiteNewsArticleFormGroupInput = { id: null }): SiteNewsArticleFormGroup {
    const siteNewsArticleRawValue = this.convertSiteNewsArticleToSiteNewsArticleRawValue({
      ...this.getFormDefaults(),
      ...siteNewsArticle,
    });
    return new FormGroup<SiteNewsArticleFormGroupContent>({
      id: new FormControl(
        { value: siteNewsArticleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(siteNewsArticleRawValue.title, {
        validators: [Validators.required],
      }),
      titleEn: new FormControl(siteNewsArticleRawValue.titleEn),
      excerpt: new FormControl(siteNewsArticleRawValue.excerpt),
      excerptEn: new FormControl(siteNewsArticleRawValue.excerptEn),
      content: new FormControl(siteNewsArticleRawValue.content),
      contentEn: new FormControl(siteNewsArticleRawValue.contentEn),
      category: new FormControl(siteNewsArticleRawValue.category),
      categoryEn: new FormControl(siteNewsArticleRawValue.categoryEn),
      author: new FormControl(siteNewsArticleRawValue.author),
      publishedAt: new FormControl(siteNewsArticleRawValue.publishedAt),
      readTime: new FormControl(siteNewsArticleRawValue.readTime),
      image: new FormControl(siteNewsArticleRawValue.image),
      fullContent: new FormControl(siteNewsArticleRawValue.fullContent),
      fullContentEn: new FormControl(siteNewsArticleRawValue.fullContentEn),
      tags: new FormControl(siteNewsArticleRawValue.tags ?? []),
    });
  }

  getSiteNewsArticle(form: SiteNewsArticleFormGroup): ISiteNewsArticle | NewSiteNewsArticle {
    return this.convertSiteNewsArticleRawValueToSiteNewsArticle(
      form.getRawValue() as SiteNewsArticleFormRawValue | NewSiteNewsArticleFormRawValue,
    );
  }

  resetForm(form: SiteNewsArticleFormGroup, siteNewsArticle: SiteNewsArticleFormGroupInput): void {
    const siteNewsArticleRawValue = this.convertSiteNewsArticleToSiteNewsArticleRawValue({ ...this.getFormDefaults(), ...siteNewsArticle });
    form.reset(
      {
        ...siteNewsArticleRawValue,
        id: { value: siteNewsArticleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SiteNewsArticleFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      publishedAt: currentTime,
      tags: [],
    };
  }

  private convertSiteNewsArticleRawValueToSiteNewsArticle(
    rawSiteNewsArticle: SiteNewsArticleFormRawValue | NewSiteNewsArticleFormRawValue,
  ): ISiteNewsArticle | NewSiteNewsArticle {
    return {
      ...rawSiteNewsArticle,
      publishedAt: dayjs(rawSiteNewsArticle.publishedAt, DATE_TIME_FORMAT),
    };
  }

  private convertSiteNewsArticleToSiteNewsArticleRawValue(
    siteNewsArticle: ISiteNewsArticle | (Partial<NewSiteNewsArticle> & SiteNewsArticleFormDefaults),
  ): SiteNewsArticleFormRawValue | PartialWithRequiredKeyOf<NewSiteNewsArticleFormRawValue> {
    return {
      ...siteNewsArticle,
      publishedAt: siteNewsArticle.publishedAt ? siteNewsArticle.publishedAt.format(DATE_TIME_FORMAT) : undefined,
      tags: siteNewsArticle.tags ?? [],
    };
  }
}
