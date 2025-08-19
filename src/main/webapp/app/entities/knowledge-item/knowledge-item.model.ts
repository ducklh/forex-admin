import dayjs from 'dayjs/esm';
import { IKnowledgeTag } from 'app/entities/knowledge-tag/knowledge-tag.model';

export interface IKnowledgeItem {
  id: string;
  title?: string | null;
  titleEn?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  content?: string | null;
  contentEn?: string | null;
  category?: string | null;
  categoryEn?: string | null;
  level?: string | null;
  levelEn?: string | null;
  author?: string | null;
  publishedAt?: dayjs.Dayjs | null;
  readTime?: number | null;
  image?: string | null;
  tags?: IKnowledgeTag[] | null;
}

export type NewKnowledgeItem = Omit<IKnowledgeItem, 'id'> & { id: null };
