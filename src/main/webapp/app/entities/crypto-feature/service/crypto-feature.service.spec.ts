import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICryptoFeature } from '../crypto-feature.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../crypto-feature.test-samples';

import { CryptoFeatureService } from './crypto-feature.service';

const requireRestSample: ICryptoFeature = {
  ...sampleWithRequiredData,
};

describe('CryptoFeature Service', () => {
  let service: CryptoFeatureService;
  let httpMock: HttpTestingController;
  let expectedResult: ICryptoFeature | ICryptoFeature[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CryptoFeatureService);
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

    it('should create a CryptoFeature', () => {
      const cryptoFeature = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cryptoFeature).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CryptoFeature', () => {
      const cryptoFeature = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cryptoFeature).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CryptoFeature', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CryptoFeature', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CryptoFeature', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCryptoFeatureToCollectionIfMissing', () => {
      it('should add a CryptoFeature to an empty array', () => {
        const cryptoFeature: ICryptoFeature = sampleWithRequiredData;
        expectedResult = service.addCryptoFeatureToCollectionIfMissing([], cryptoFeature);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoFeature);
      });

      it('should not add a CryptoFeature to an array that contains it', () => {
        const cryptoFeature: ICryptoFeature = sampleWithRequiredData;
        const cryptoFeatureCollection: ICryptoFeature[] = [
          {
            ...cryptoFeature,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCryptoFeatureToCollectionIfMissing(cryptoFeatureCollection, cryptoFeature);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CryptoFeature to an array that doesn't contain it", () => {
        const cryptoFeature: ICryptoFeature = sampleWithRequiredData;
        const cryptoFeatureCollection: ICryptoFeature[] = [sampleWithPartialData];
        expectedResult = service.addCryptoFeatureToCollectionIfMissing(cryptoFeatureCollection, cryptoFeature);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoFeature);
      });

      it('should add only unique CryptoFeature to an array', () => {
        const cryptoFeatureArray: ICryptoFeature[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cryptoFeatureCollection: ICryptoFeature[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoFeatureToCollectionIfMissing(cryptoFeatureCollection, ...cryptoFeatureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cryptoFeature: ICryptoFeature = sampleWithRequiredData;
        const cryptoFeature2: ICryptoFeature = sampleWithPartialData;
        expectedResult = service.addCryptoFeatureToCollectionIfMissing([], cryptoFeature, cryptoFeature2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoFeature);
        expect(expectedResult).toContain(cryptoFeature2);
      });

      it('should accept null and undefined values', () => {
        const cryptoFeature: ICryptoFeature = sampleWithRequiredData;
        expectedResult = service.addCryptoFeatureToCollectionIfMissing([], null, cryptoFeature, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoFeature);
      });

      it('should return initial array if no CryptoFeature is added', () => {
        const cryptoFeatureCollection: ICryptoFeature[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoFeatureToCollectionIfMissing(cryptoFeatureCollection, undefined, null);
        expect(expectedResult).toEqual(cryptoFeatureCollection);
      });
    });

    describe('compareCryptoFeature', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCryptoFeature(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
        const entity2 = null;

        const compareResult1 = service.compareCryptoFeature(entity1, entity2);
        const compareResult2 = service.compareCryptoFeature(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
        const entity2 = { id: 'a38f2c9f-1bdd-4ddd-b744-d70a12eea5a8' };

        const compareResult1 = service.compareCryptoFeature(entity1, entity2);
        const compareResult2 = service.compareCryptoFeature(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };
        const entity2 = { id: '564b60f2-6b57-48e7-9192-92ac905f3c9f' };

        const compareResult1 = service.compareCryptoFeature(entity1, entity2);
        const compareResult2 = service.compareCryptoFeature(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
