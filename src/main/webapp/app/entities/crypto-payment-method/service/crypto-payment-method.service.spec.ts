import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICryptoPaymentMethod } from '../crypto-payment-method.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../crypto-payment-method.test-samples';

import { CryptoPaymentMethodService } from './crypto-payment-method.service';

const requireRestSample: ICryptoPaymentMethod = {
  ...sampleWithRequiredData,
};

describe('CryptoPaymentMethod Service', () => {
  let service: CryptoPaymentMethodService;
  let httpMock: HttpTestingController;
  let expectedResult: ICryptoPaymentMethod | ICryptoPaymentMethod[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CryptoPaymentMethodService);
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

    it('should create a CryptoPaymentMethod', () => {
      const cryptoPaymentMethod = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cryptoPaymentMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CryptoPaymentMethod', () => {
      const cryptoPaymentMethod = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cryptoPaymentMethod).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CryptoPaymentMethod', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CryptoPaymentMethod', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CryptoPaymentMethod', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCryptoPaymentMethodToCollectionIfMissing', () => {
      it('should add a CryptoPaymentMethod to an empty array', () => {
        const cryptoPaymentMethod: ICryptoPaymentMethod = sampleWithRequiredData;
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing([], cryptoPaymentMethod);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoPaymentMethod);
      });

      it('should not add a CryptoPaymentMethod to an array that contains it', () => {
        const cryptoPaymentMethod: ICryptoPaymentMethod = sampleWithRequiredData;
        const cryptoPaymentMethodCollection: ICryptoPaymentMethod[] = [
          {
            ...cryptoPaymentMethod,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing(cryptoPaymentMethodCollection, cryptoPaymentMethod);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CryptoPaymentMethod to an array that doesn't contain it", () => {
        const cryptoPaymentMethod: ICryptoPaymentMethod = sampleWithRequiredData;
        const cryptoPaymentMethodCollection: ICryptoPaymentMethod[] = [sampleWithPartialData];
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing(cryptoPaymentMethodCollection, cryptoPaymentMethod);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoPaymentMethod);
      });

      it('should add only unique CryptoPaymentMethod to an array', () => {
        const cryptoPaymentMethodArray: ICryptoPaymentMethod[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cryptoPaymentMethodCollection: ICryptoPaymentMethod[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing(cryptoPaymentMethodCollection, ...cryptoPaymentMethodArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cryptoPaymentMethod: ICryptoPaymentMethod = sampleWithRequiredData;
        const cryptoPaymentMethod2: ICryptoPaymentMethod = sampleWithPartialData;
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing([], cryptoPaymentMethod, cryptoPaymentMethod2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cryptoPaymentMethod);
        expect(expectedResult).toContain(cryptoPaymentMethod2);
      });

      it('should accept null and undefined values', () => {
        const cryptoPaymentMethod: ICryptoPaymentMethod = sampleWithRequiredData;
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing([], null, cryptoPaymentMethod, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cryptoPaymentMethod);
      });

      it('should return initial array if no CryptoPaymentMethod is added', () => {
        const cryptoPaymentMethodCollection: ICryptoPaymentMethod[] = [sampleWithRequiredData];
        expectedResult = service.addCryptoPaymentMethodToCollectionIfMissing(cryptoPaymentMethodCollection, undefined, null);
        expect(expectedResult).toEqual(cryptoPaymentMethodCollection);
      });
    });

    describe('compareCryptoPaymentMethod', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCryptoPaymentMethod(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
        const entity2 = null;

        const compareResult1 = service.compareCryptoPaymentMethod(entity1, entity2);
        const compareResult2 = service.compareCryptoPaymentMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
        const entity2 = { id: '0d83b43f-0105-4ce5-8aad-e6dd6a145fc6' };

        const compareResult1 = service.compareCryptoPaymentMethod(entity1, entity2);
        const compareResult2 = service.compareCryptoPaymentMethod(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };
        const entity2 = { id: '4cda1e88-7339-40e9-ad09-0759e7964628' };

        const compareResult1 = service.compareCryptoPaymentMethod(entity1, entity2);
        const compareResult2 = service.compareCryptoPaymentMethod(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
