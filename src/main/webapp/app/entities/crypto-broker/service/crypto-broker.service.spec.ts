import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICryptoBroker } from '../crypto-broker.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../crypto-broker.test-samples';

import { CryptoBrokerService } from './crypto-broker.service';

const requireRestSample: ICryptoBroker = {
  ...sampleWithRequiredData,
};

describe('CryptoBroker Service', () => {
  let service: CryptoBrokerService;
  let httpMock: HttpTestingController;
  let expectedResult: ICryptoBroker | ICryptoBroker[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CryptoBrokerService);
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

    it('should create a CryptoBroker', () => {
      const cryptoBroker = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cryptoBroker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CryptoBroker', () => {
      const cryptoBroker = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cryptoBroker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CryptoBroker', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CryptoBroker', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CryptoBroker', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCryptoBrokerToCollectionIfMissing', () => {
      it('should add a CryptoBroker to an empty array', () => {
        const cryptoBroker: ICryptoBroker = sampleWithRequiredData;
        expectedResult = service.addCryptoBrokerToCollectionIfMissing([], cryptoBroker);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoBroker);
      });

      it('should not add a CryptoBroker to an array that contains it', () => {
        const cryptoBroker: ICryptoBroker = sampleWithRequiredData;
        const cryptoBrokerCollection: ICryptoBroker[] = [
          {
            ...cryptoBroker,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCryptoBrokerToCollectionIfMissing(cryptoBrokerCollection, cryptoBroker);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CryptoBroker to an array that doesn't contain it", () => {
        const cryptoBroker: ICryptoBroker = sampleWithRequiredData;
        const cryptoBrokerCollection: ICryptoBroker[] = [sampleWithPartialData];
        expectedResult = service.addCryptoBrokerToCollectionIfMissing(cryptoBrokerCollection, cryptoBroker);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoBroker);
      });

      it('should add only unique CryptoBroker to an array', () => {
        const cryptoBrokerArray: ICryptoBroker[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cryptoBrokerCollection: ICryptoBroker[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoBrokerToCollectionIfMissing(cryptoBrokerCollection, ...cryptoBrokerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cryptoBroker: ICryptoBroker = sampleWithRequiredData;
        const cryptoBroker2: ICryptoBroker = sampleWithPartialData;
        expectedResult = service.addCryptoBrokerToCollectionIfMissing([], cryptoBroker, cryptoBroker2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoBroker);
        expect(expectedResult).toContain(cryptoBroker2);
      });

      it('should accept null and undefined values', () => {
        const cryptoBroker: ICryptoBroker = sampleWithRequiredData;
        expectedResult = service.addCryptoBrokerToCollectionIfMissing([], null, cryptoBroker, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoBroker);
      });

      it('should return initial array if no CryptoBroker is added', () => {
        const cryptoBrokerCollection: ICryptoBroker[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoBrokerToCollectionIfMissing(cryptoBrokerCollection, undefined, null);
        expect(expectedResult).toEqual(cryptoBrokerCollection);
      });
    });

    describe('compareCryptoBroker', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCryptoBroker(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
        const entity2 = null;

        const compareResult1 = service.compareCryptoBroker(entity1, entity2);
        const compareResult2 = service.compareCryptoBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
        const entity2 = { id: 'b41bfe7f-8239-46fe-99bf-a1adc82a7829' };

        const compareResult1 = service.compareCryptoBroker(entity1, entity2);
        const compareResult2 = service.compareCryptoBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };
        const entity2 = { id: '1c734725-a91b-401d-ab83-6ee7d1d6af78' };

        const compareResult1 = service.compareCryptoBroker(entity1, entity2);
        const compareResult2 = service.compareCryptoBroker(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
