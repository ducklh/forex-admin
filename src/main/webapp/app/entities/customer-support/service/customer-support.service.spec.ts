import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICustomerSupport } from '../customer-support.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../customer-support.test-samples';

import { CustomerSupportService } from './customer-support.service';

const requireRestSample: ICustomerSupport = {
  ...sampleWithRequiredData,
};

describe('CustomerSupport Service', () => {
  let service: CustomerSupportService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomerSupport | ICustomerSupport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CustomerSupportService);
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

    it('should create a CustomerSupport', () => {
      const customerSupport = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customerSupport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomerSupport', () => {
      const customerSupport = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customerSupport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomerSupport', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomerSupport', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomerSupport', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomerSupportToCollectionIfMissing', () => {
      it('should add a CustomerSupport to an empty array', () => {
        const customerSupport: ICustomerSupport = sampleWithRequiredData;
        expectedResult = service.addCustomerSupportToCollectionIfMissing([], customerSupport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerSupport);
      });

      it('should not add a CustomerSupport to an array that contains it', () => {
        const customerSupport: ICustomerSupport = sampleWithRequiredData;
        const customerSupportCollection: ICustomerSupport[] = [
          {
            ...customerSupport,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomerSupportToCollectionIfMissing(customerSupportCollection, customerSupport);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomerSupport to an array that doesn't contain it", () => {
        const customerSupport: ICustomerSupport = sampleWithRequiredData;
        const customerSupportCollection: ICustomerSupport[] = [sampleWithPartialData];
        expectedResult = service.addCustomerSupportToCollectionIfMissing(customerSupportCollection, customerSupport);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerSupport);
      });

      it('should add only unique CustomerSupport to an array', () => {
        const customerSupportArray: ICustomerSupport[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const customerSupportCollection: ICustomerSupport[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerSupportToCollectionIfMissing(customerSupportCollection, ...customerSupportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customerSupport: ICustomerSupport = sampleWithRequiredData;
        const customerSupport2: ICustomerSupport = sampleWithPartialData;
        expectedResult = service.addCustomerSupportToCollectionIfMissing([], customerSupport, customerSupport2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerSupport);
        expect(expectedResult).toContain(customerSupport2);
      });

      it('should accept null and undefined values', () => {
        const customerSupport: ICustomerSupport = sampleWithRequiredData;
        expectedResult = service.addCustomerSupportToCollectionIfMissing([], null, customerSupport, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerSupport);
      });

      it('should return initial array if no CustomerSupport is added', () => {
        const customerSupportCollection: ICustomerSupport[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerSupportToCollectionIfMissing(customerSupportCollection, undefined, null);
        expect(expectedResult).toEqual(customerSupportCollection);
      });
    });

    describe('compareCustomerSupport', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomerSupport(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
        const entity2 = null;

        const compareResult1 = service.compareCustomerSupport(entity1, entity2);
        const compareResult2 = service.compareCustomerSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
        const entity2 = { id: 'db4d48c3-79f7-4673-a5cf-694630d2ff2e' };

        const compareResult1 = service.compareCustomerSupport(entity1, entity2);
        const compareResult2 = service.compareCustomerSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };
        const entity2 = { id: 'be842099-dd16-4e6f-9231-05a7d33c7aff' };

        const compareResult1 = service.compareCustomerSupport(entity1, entity2);
        const compareResult2 = service.compareCustomerSupport(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
