import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IRegulation } from '../regulation.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../regulation.test-samples';

import { RegulationService } from './regulation.service';

const requireRestSample: IRegulation = {
  ...sampleWithRequiredData,
};

describe('Regulation Service', () => {
  let service: RegulationService;
  let httpMock: HttpTestingController;
  let expectedResult: IRegulation | IRegulation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(RegulationService);
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

    it('should create a Regulation', () => {
      const regulation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(regulation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Regulation', () => {
      const regulation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(regulation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Regulation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Regulation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Regulation', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRegulationToCollectionIfMissing', () => {
      it('should add a Regulation to an empty array', () => {
        const regulation: IRegulation = sampleWithRequiredData;
        expectedResult = service.addRegulationToCollectionIfMissing([], regulation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(regulation);
      });

      it('should not add a Regulation to an array that contains it', () => {
        const regulation: IRegulation = sampleWithRequiredData;
        const regulationCollection: IRegulation[] = [
          {
            ...regulation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRegulationToCollectionIfMissing(regulationCollection, regulation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Regulation to an array that doesn't contain it", () => {
        const regulation: IRegulation = sampleWithRequiredData;
        const regulationCollection: IRegulation[] = [sampleWithPartialData];
        expectedResult = service.addRegulationToCollectionIfMissing(regulationCollection, regulation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(regulation);
      });

      it('should add only unique Regulation to an array', () => {
        const regulationArray: IRegulation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const regulationCollection: IRegulation[] = [sampleWithRequiredData];
        expectedResult = service.addRegulationToCollectionIfMissing(regulationCollection, ...regulationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const regulation: IRegulation = sampleWithRequiredData;
        const regulation2: IRegulation = sampleWithPartialData;
        expectedResult = service.addRegulationToCollectionIfMissing([], regulation, regulation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(regulation);
        expect(expectedResult).toContain(regulation2);
      });

      it('should accept null and undefined values', () => {
        const regulation: IRegulation = sampleWithRequiredData;
        expectedResult = service.addRegulationToCollectionIfMissing([], null, regulation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(regulation);
      });

      it('should return initial array if no Regulation is added', () => {
        const regulationCollection: IRegulation[] = [sampleWithRequiredData];
        expectedResult = service.addRegulationToCollectionIfMissing(regulationCollection, undefined, null);
        expect(expectedResult).toEqual(regulationCollection);
      });
    });

    describe('compareRegulation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRegulation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
        const entity2 = null;

        const compareResult1 = service.compareRegulation(entity1, entity2);
        const compareResult2 = service.compareRegulation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
        const entity2 = { id: '5c8c3687-208a-4f2d-8e84-f5ecec89e7bf' };

        const compareResult1 = service.compareRegulation(entity1, entity2);
        const compareResult2 = service.compareRegulation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };
        const entity2 = { id: '1d26effb-5a95-4be5-b32c-5bc200340b30' };

        const compareResult1 = service.compareRegulation(entity1, entity2);
        const compareResult2 = service.compareRegulation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
