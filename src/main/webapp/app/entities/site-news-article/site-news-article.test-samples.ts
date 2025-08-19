import dayjs from 'dayjs/esm';

import { ISiteNewsArticle, NewSiteNewsArticle } from './site-news-article.model';

export const sampleWithRequiredData: ISiteNewsArticle = {
  id: 'd6966ed2-c79e-4eae-bdfd-d8ac816f08b4',
  title: 'unhappy',
};

export const sampleWithPartialData: ISiteNewsArticle = {
  id: 'a145f25d-8b6b-44ee-9b1d-ad89d2e2738a',
  title: 'cornet',
  titleEn: 'colorful yum',
  excerpt: 'boohoo',
  excerptEn: 'supposing hmph',
  content: '../fake-data/blob/hipster.txt',
  categoryEn: 'insistent nor violently',
  author: 'transom release',
  publishedAt: dayjs('2025-08-19T03:49'),
  readTime: 'content yippee',
  image: 'afore',
};

export const sampleWithFullData: ISiteNewsArticle = {
  id: 'abc83e32-b78d-48eb-b460-43e5467263bc',
  title: 'delightfully ack',
  titleEn: 'puzzled milky',
  excerpt: 'community',
  excerptEn: 'athwart drat starch',
  content: '../fake-data/blob/hipster.txt',
  contentEn: '../fake-data/blob/hipster.txt',
  category: 'indeed fiercely',
  categoryEn: 'lively hawk',
  author: 'capsize pish',
  publishedAt: dayjs('2025-08-19T14:29'),
  readTime: 'carpool elegantly experienced',
  image: 'ugh for suffice',
  fullContent: '../fake-data/blob/hipster.txt',
  fullContentEn: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSiteNewsArticle = {
  title: 'uh-huh redraw',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
