import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IBroker } from '../broker.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../broker.test-samples';

import { BrokerService } from './broker.service';

const requireRestSample: IBroker = {
  ...sampleWithRequiredData,
};

describe('Broker Service', () => {
  let service: BrokerService;
  let httpMock: HttpTestingController;
  let expectedResult: IBroker | IBroker[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BrokerService);
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

    it('should create a Broker', () => {
      const broker = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(broker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Broker', () => {
      const broker = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(broker).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Broker', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Broker', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Broker', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBrokerToCollectionIfMissing', () => {
      it('should add a Broker to an empty array', () => {
        const broker: IBroker = sampleWithRequiredData;
        expectedResult = service.addBrokerToCollectionIfMissing([], broker);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(broker);
      });

      it('should not add a Broker to an array that contains it', () => {
        const broker: IBroker = sampleWithRequiredData;
        const brokerCollection: IBroker[] = [
          {
            ...broker,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBrokerToCollectionIfMissing(brokerCollection, broker);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Broker to an array that doesn't contain it", () => {
        const broker: IBroker = sampleWithRequiredData;
        const brokerCollection: IBroker[] = [sampleWithPartialData];
        expectedResult = service.addBrokerToCollectionIfMissing(brokerCollection, broker);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(broker);
      });

      it('should add only unique Broker to an array', () => {
        const brokerArray: IBroker[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const brokerCollection: IBroker[] = [sampleWithRequiredData];
        expectedResult = service.addBrokerToCollectionIfMissing(brokerCollection, ...brokerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const broker: IBroker = sampleWithRequiredData;
        const broker2: IBroker = sampleWithPartialData;
        expectedResult = service.addBrokerToCollectionIfMissing([], broker, broker2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(broker);
        expect(expectedResult).toContain(broker2);
      });

      it('should accept null and undefined values', () => {
        const broker: IBroker = sampleWithRequiredData;
        expectedResult = service.addBrokerToCollectionIfMissing([], null, broker, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(broker);
      });

      it('should return initial array if no Broker is added', () => {
        const brokerCollection: IBroker[] = [sampleWithRequiredData];
        expectedResult = service.addBrokerToCollectionIfMissing(brokerCollection, undefined, null);
        expect(expectedResult).toEqual(brokerCollection);
      });
    });

    describe('compareBroker', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBroker(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
        const entity2 = null;

        const compareResult1 = service.compareBroker(entity1, entity2);
        const compareResult2 = service.compareBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
        const entity2 = { id: '71abe793-642a-4ca6-a811-2bf9b91fef05' };

        const compareResult1 = service.compareBroker(entity1, entity2);
        const compareResult2 = service.compareBroker(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };
        const entity2 = { id: '5f6e7bd8-e06b-4f58-bfff-3a911359eb01' };

        const compareResult1 = service.compareBroker(entity1, entity2);
        const compareResult2 = service.compareBroker(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
