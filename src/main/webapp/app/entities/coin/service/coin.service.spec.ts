import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICoin } from '../coin.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../coin.test-samples';

import { CoinService } from './coin.service';

const requireRestSample: ICoin = {
  ...sampleWithRequiredData,
};

describe('Coin Service', () => {
  let service: CoinService;
  let httpMock: HttpTestingController;
  let expectedResult: ICoin | ICoin[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CoinService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Coin', () => {
      const coin = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(coin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Coin', () => {
      const coin = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(coin).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Coin', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Coin', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Coin', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCoinToCollectionIfMissing', () => {
      it('should add a Coin to an empty array', () => {
        const coin: ICoin = sampleWithRequiredData;
        expectedResult = service.addCoinToCollectionIfMissing([], coin);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(coin);
      });

      it('should not add a Coin to an array that contains it', () => {
        const coin: ICoin = sampleWithRequiredData;
        const coinCollection: ICoin[] = [
          {
            ...coin,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCoinToCollectionIfMissing(coinCollection, coin);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Coin to an array that doesn't contain it", () => {
        const coin: ICoin = sampleWithRequiredData;
        const coinCollection: ICoin[] = [sampleWithPartialData];
        expectedResult = service.addCoinToCollectionIfMissing(coinCollection, coin);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(coin);
      });

      it('should add only unique Coin to an array', () => {
        const coinArray: ICoin[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const coinCollection: ICoin[] = [sampleWithRequiredData];
        expectedResult = service.addCoinToCollectionIfMissing(coinCollection, ...coinArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const coin: ICoin = sampleWithRequiredData;
        const coin2: ICoin = sampleWithPartialData;
        expectedResult = service.addCoinToCollectionIfMissing([], coin, coin2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(coin);
        expect(expectedResult).toContain(coin2);
      });

      it('should accept null and undefined values', () => {
        const coin: ICoin = sampleWithRequiredData;
        expectedResult = service.addCoinToCollectionIfMissing([], null, coin, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(coin);
      });

      it('should return initial array if no Coin is added', () => {
        const coinCollection: ICoin[] = [sampleWithRequiredData];
        expectedResult = service.addCoinToCollectionIfMissing(coinCollection, undefined, null);
        expect(expectedResult).toEqual(coinCollection);
      });
    });

    describe('compareCoin', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCoin(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
        const entity2 = null;

        const compareResult1 = service.compareCoin(entity1, entity2);
        const compareResult2 = service.compareCoin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
        const entity2 = { id: 'd9aa5557-77d7-41d3-b809-5ad07ff6d746' };

        const compareResult1 = service.compareCoin(entity1, entity2);
        const compareResult2 = service.compareCoin(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '64f7186a-27f9-4553-9d40-693947555dad' };
        const entity2 = { id: '64f7186a-27f9-4553-9d40-693947555dad' };

        const compareResult1 = service.compareCoin(entity1, entity2);
        const compareResult2 = service.compareCoin(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
