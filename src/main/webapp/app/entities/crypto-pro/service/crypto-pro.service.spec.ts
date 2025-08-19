import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICryptoPro } from '../crypto-pro.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../crypto-pro.test-samples';

import { CryptoProService } from './crypto-pro.service';

const requireRestSample: ICryptoPro = {
  ...sampleWithRequiredData,
};

describe('CryptoPro Service', () => {
  let service: CryptoProService;
  let httpMock: HttpTestingController;
  let expectedResult: ICryptoPro | ICryptoPro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CryptoProService);
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

    it('should create a CryptoPro', () => {
      const cryptoPro = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cryptoPro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CryptoPro', () => {
      const cryptoPro = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cryptoPro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CryptoPro', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CryptoPro', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CryptoPro', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCryptoProToCollectionIfMissing', () => {
      it('should add a CryptoPro to an empty array', () => {
        const cryptoPro: ICryptoPro = sampleWithRequiredData;
        expectedResult = service.addCryptoProToCollectionIfMissing([], cryptoPro);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoPro);
      });

      it('should not add a CryptoPro to an array that contains it', () => {
        const cryptoPro: ICryptoPro = sampleWithRequiredData;
        const cryptoProCollection: ICryptoPro[] = [
          {
            ...cryptoPro,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCryptoProToCollectionIfMissing(cryptoProCollection, cryptoPro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CryptoPro to an array that doesn't contain it", () => {
        const cryptoPro: ICryptoPro = sampleWithRequiredData;
        const cryptoProCollection: ICryptoPro[] = [sampleWithPartialData];
        expectedResult = service.addCryptoProToCollectionIfMissing(cryptoProCollection, cryptoPro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoPro);
      });

      it('should add only unique CryptoPro to an array', () => {
        const cryptoProArray: ICryptoPro[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cryptoProCollection: ICryptoPro[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoProToCollectionIfMissing(cryptoProCollection, ...cryptoProArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cryptoPro: ICryptoPro = sampleWithRequiredData;
        const cryptoPro2: ICryptoPro = sampleWithPartialData;
        expectedResult = service.addCryptoProToCollectionIfMissing([], cryptoPro, cryptoPro2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoPro);
        expect(expectedResult).toContain(cryptoPro2);
      });

      it('should accept null and undefined values', () => {
        const cryptoPro: ICryptoPro = sampleWithRequiredData;
        expectedResult = service.addCryptoProToCollectionIfMissing([], null, cryptoPro, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoPro);
      });

      it('should return initial array if no CryptoPro is added', () => {
        const cryptoProCollection: ICryptoPro[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoProToCollectionIfMissing(cryptoProCollection, undefined, null);
        expect(expectedResult).toEqual(cryptoProCollection);
      });
    });

    describe('compareCryptoPro', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCryptoPro(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
        const entity2 = null;

        const compareResult1 = service.compareCryptoPro(entity1, entity2);
        const compareResult2 = service.compareCryptoPro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
        const entity2 = { id: '3fd53cf1-b6be-4d35-8e92-1b9662b97e99' };

        const compareResult1 = service.compareCryptoPro(entity1, entity2);
        const compareResult2 = service.compareCryptoPro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };
        const entity2 = { id: 'd1f5fde7-7add-4950-b169-e65a199576e6' };

        const compareResult1 = service.compareCryptoPro(entity1, entity2);
        const compareResult2 = service.compareCryptoPro(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
