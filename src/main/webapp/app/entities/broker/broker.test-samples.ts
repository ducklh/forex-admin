import { IBroker, NewBroker } from './broker.model';

export const sampleWithRequiredData: IBroker = {
  id: 'a50526d7-67d9-4b13-9ab9-3f270cbfb8bb',
  name: 'thyme ripe',
};

export const sampleWithPartialData: IBroker = {
  id: '27238f9c-cc0e-42b3-8e8e-5de126857998',
  name: 'delightfully why',
  logo: 'reboot',
  rating: 31740.1,
  minDeposit: 17029.28,
  spreads: 'not categorise keel',
};

export const sampleWithFullData: IBroker = {
  id: '1cdf43af-c5fc-4572-8fed-f3188c08536a',
  name: 'best-seller',
  logo: 'er elderly rowdy',
  url: 'https://drab-glider.name',
  description: '../fake-data/blob/hipster.txt',
  rating: 19516.16,
  minDeposit: 29870,
  spreads: 'so',
  leverage: 'yet lawmaker video',
  founded: 19119,
  headquarters: 'fast',
};

export const sampleWithNewData: NewBroker = {
  name: 'bid now soulful',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
