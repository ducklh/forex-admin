import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICryptoCon } from '../crypto-con.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../crypto-con.test-samples';

import { CryptoConService } from './crypto-con.service';

const requireRestSample: ICryptoCon = {
  ...sampleWithRequiredData,
};

describe('CryptoCon Service', () => {
  let service: CryptoConService;
  let httpMock: HttpTestingController;
  let expectedResult: ICryptoCon | ICryptoCon[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CryptoConService);
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

    it('should create a CryptoCon', () => {
      const cryptoCon = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cryptoCon).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CryptoCon', () => {
      const cryptoCon = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cryptoCon).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CryptoCon', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CryptoCon', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CryptoCon', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCryptoConToCollectionIfMissing', () => {
      it('should add a CryptoCon to an empty array', () => {
        const cryptoCon: ICryptoCon = sampleWithRequiredData;
        expectedResult = service.addCryptoConToCollectionIfMissing([], cryptoCon);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoCon);
      });

      it('should not add a CryptoCon to an array that contains it', () => {
        const cryptoCon: ICryptoCon = sampleWithRequiredData;
        const cryptoConCollection: ICryptoCon[] = [
          {
            ...cryptoCon,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCryptoConToCollectionIfMissing(cryptoConCollection, cryptoCon);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CryptoCon to an array that doesn't contain it", () => {
        const cryptoCon: ICryptoCon = sampleWithRequiredData;
        const cryptoConCollection: ICryptoCon[] = [sampleWithPartialData];
        expectedResult = service.addCryptoConToCollectionIfMissing(cryptoConCollection, cryptoCon);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoCon);
      });

      it('should add only unique CryptoCon to an array', () => {
        const cryptoConArray: ICryptoCon[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cryptoConCollection: ICryptoCon[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoConToCollectionIfMissing(cryptoConCollection, ...cryptoConArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cryptoCon: ICryptoCon = sampleWithRequiredData;
        const cryptoCon2: ICryptoCon = sampleWithPartialData;
        expectedResult = service.addCryptoConToCollectionIfMissing([], cryptoCon, cryptoCon2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoCon);
        expect(expectedResult).toContain(cryptoCon2);
      });

      it('should accept null and undefined values', () => {
        const cryptoCon: ICryptoCon = sampleWithRequiredData;
        expectedResult = service.addCryptoConToCollectionIfMissing([], null, cryptoCon, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoCon);
      });

      it('should return initial array if no CryptoCon is added', () => {
        const cryptoConCollection: ICryptoCon[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoConToCollectionIfMissing(cryptoConCollection, undefined, null);
        expect(expectedResult).toEqual(cryptoConCollection);
      });
    });

    describe('compareCryptoCon', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCryptoCon(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
        const entity2 = null;

        const compareResult1 = service.compareCryptoCon(entity1, entity2);
        const compareResult2 = service.compareCryptoCon(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
        const entity2 = { id: '4762ce79-df84-4fa7-a945-c12d85984b8f' };

        const compareResult1 = service.compareCryptoCon(entity1, entity2);
        const compareResult2 = service.compareCryptoCon(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };
        const entity2 = { id: '0c984349-ba43-4134-a6fb-760605f9acb1' };

        const compareResult1 = service.compareCryptoCon(entity1, entity2);
        const compareResult2 = service.compareCryptoCon(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
