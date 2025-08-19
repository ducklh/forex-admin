import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IForexBroker } from '../forex-broker.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../forex-broker.test-samples';

import { ForexBrokerService } from './forex-broker.service';

const requireRestSample: IForexBroker = {
  ...sampleWithRequiredData,
};

describe('ForexBroker Service', () => {
  let service: ForexBrokerService;
  let httpMock: HttpTestingController;
  let expectedResult: IForexBroker | IForexBroker[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ForexBrokerService);
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

    it('should create a ForexBroker', () => {
      const forexBroker = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(forexBroker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ForexBroker', () => {
      const forexBroker = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(forexBroker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ForexBroker', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ForexBroker', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ForexBroker', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addForexBrokerToCollectionIfMissing', () => {
      it('should add a ForexBroker to an empty array', () => {
        const forexBroker: IForexBroker = sampleWithRequiredData;
        expectedResult = service.addForexBrokerToCollectionIfMissing([], forexBroker);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(forexBroker);
      });

      it('should not add a ForexBroker to an array that contains it', () => {
        const forexBroker: IForexBroker = sampleWithRequiredData;
        const forexBrokerCollection: IForexBroker[] = [
          {
            ...forexBroker,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addForexBrokerToCollectionIfMissing(forexBrokerCollection, forexBroker);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ForexBroker to an array that doesn't contain it", () => {
        const forexBroker: IForexBroker = sampleWithRequiredData;
        const forexBrokerCollection: IForexBroker[] = [sampleWithPartialData];
        expectedResult = service.addForexBrokerToCollectionIfMissing(forexBrokerCollection, forexBroker);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(forexBroker);
      });

      it('should add only unique ForexBroker to an array', () => {
        const forexBrokerArray: IForexBroker[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const forexBrokerCollection: IForexBroker[] = [sampleWithRequiredData];
        expectedResult = service.addForexBrokerToCollectionIfMissing(forexBrokerCollection, ...forexBrokerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const forexBroker: IForexBroker = sampleWithRequiredData;
        const forexBroker2: IForexBroker = sampleWithPartialData;
        expectedResult = service.addForexBrokerToCollectionIfMissing([], forexBroker, forexBroker2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(forexBroker);
        expect(expectedResult).toContain(forexBroker2);
      });

      it('should accept null and undefined values', () => {
        const forexBroker: IForexBroker = sampleWithRequiredData;
        expectedResult = service.addForexBrokerToCollectionIfMissing([], null, forexBroker, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(forexBroker);
      });

      it('should return initial array if no ForexBroker is added', () => {
        const forexBrokerCollection: IForexBroker[] = [sampleWithRequiredData];
        expectedResult = service.addForexBrokerToCollectionIfMissing(forexBrokerCollection, undefined, null);
        expect(expectedResult).toEqual(forexBrokerCollection);
      });
    });

    describe('compareForexBroker', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareForexBroker(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
        const entity2 = null;

        const compareResult1 = service.compareForexBroker(entity1, entity2);
        const compareResult2 = service.compareForexBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
        const entity2 = { id: '2aff6d91-60ed-4803-ba1a-3a972531ba41' };

        const compareResult1 = service.compareForexBroker(entity1, entity2);
        const compareResult2 = service.compareForexBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };
        const entity2 = { id: 'fd1292f6-1c06-4137-b30f-106c1d88abdc' };

        const compareResult1 = service.compareForexBroker(entity1, entity2);
        const compareResult2 = service.compareForexBroker(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
