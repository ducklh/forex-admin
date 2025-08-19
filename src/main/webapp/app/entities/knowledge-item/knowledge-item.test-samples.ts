import dayjs from 'dayjs/esm';

import { IKnowledgeItem, NewKnowledgeItem } from './knowledge-item.model';

export const sampleWithRequiredData: IKnowledgeItem = {
  id: '1c1bba41-fc23-4c40-9952-e84a8d6221c0',
  title: 'hmph grandpa willfully',
};

export const sampleWithPartialData: IKnowledgeItem = {
  id: 'f9332b5b-d054-4ec7-b77d-c1e549a33c48',
  title: 'ack husk coaxingly',
  excerptEn: 'why',
  contentEn: '../fake-data/blob/hipster.txt',
  categoryEn: 'train jellyfish',
  levelEn: 'yearningly usually once',
  image: 'salty conclude frivolous',
};

export const sampleWithFullData: IKnowledgeItem = {
  id: 'd4c7ecec-1b6a-44d6-8227-d01b876117d4',
  title: 'unless',
  titleEn: 'frantically by drat',
  excerpt: 'sunder oh',
  excerptEn: 'the',
  content: '../fake-data/blob/hipster.txt',
  contentEn: '../fake-data/blob/hipster.txt',
  category: 'bid fork joshingly',
  categoryEn: 'daintily dally indeed',
  level: 'yahoo who uh-huh',
  levelEn: 'incidentally considering continually',
  author: 'er alienated ameliorate',
  publishedAt: dayjs('2025-08-19T08:19'),
  readTime: 2712,
  image: 'when surprisingly utilized',
};

export const sampleWithNewData: NewKnowledgeItem = {
  title: 'infinite unexpectedly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
