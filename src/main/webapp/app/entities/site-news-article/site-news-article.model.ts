import dayjs from 'dayjs/esm';
import { ITag } from 'app/entities/tag/tag.model';

export interface ISiteNewsArticle {
  id: string;
  title?: string | null;
  titleEn?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  content?: string | null;
  contentEn?: string | null;
  category?: string | null;
  categoryEn?: string | null;
  author?: string | null;
  publishedAt?: dayjs.Dayjs | null;
  readTime?: string | null;
  image?: string | null;
  fullContent?: string | null;
  fullContentEn?: string | null;
  tags?: ITag[] | null;
}

export type NewSiteNewsArticle = Omit<ISiteNewsArticle, 'id'> & { id: null };
