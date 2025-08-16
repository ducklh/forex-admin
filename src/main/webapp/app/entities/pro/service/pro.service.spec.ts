import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IPro } from '../pro.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../pro.test-samples';

import { ProService } from './pro.service';

const requireRestSample: IPro = {
  ...sampleWithRequiredData,
};

describe('Pro Service', () => {
  let service: ProService;
  let httpMock: HttpTestingController;
  let expectedResult: IPro | IPro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProService);
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

    it('should create a Pro', () => {
      const pro = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pro', () => {
      const pro = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pro).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pro', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pro', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pro', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProToCollectionIfMissing', () => {
      it('should add a Pro to an empty array', () => {
        const pro: IPro = sampleWithRequiredData;
        expectedResult = service.addProToCollectionIfMissing([], pro);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pro);
      });

      it('should not add a Pro to an array that contains it', () => {
        const pro: IPro = sampleWithRequiredData;
        const proCollection: IPro[] = [
          {
            ...pro,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProToCollectionIfMissing(proCollection, pro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pro to an array that doesn't contain it", () => {
        const pro: IPro = sampleWithRequiredData;
        const proCollection: IPro[] = [sampleWithPartialData];
        expectedResult = service.addProToCollectionIfMissing(proCollection, pro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pro);
      });

      it('should add only unique Pro to an array', () => {
        const proArray: IPro[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const proCollection: IPro[] = [sampleWithRequiredData];
        expectedResult = service.addProToCollectionIfMissing(proCollection, ...proArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pro: IPro = sampleWithRequiredData;
        const pro2: IPro = sampleWithPartialData;
        expectedResult = service.addProToCollectionIfMissing([], pro, pro2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pro);
        expect(expectedResult).toContain(pro2);
      });

      it('should accept null and undefined values', () => {
        const pro: IPro = sampleWithRequiredData;
        expectedResult = service.addProToCollectionIfMissing([], null, pro, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pro);
      });

      it('should return initial array if no Pro is added', () => {
        const proCollection: IPro[] = [sampleWithRequiredData];
        expectedResult = service.addProToCollectionIfMissing(proCollection, undefined, null);
        expect(expectedResult).toEqual(proCollection);
      });
    });

    describe('comparePro', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePro(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
        const entity2 = null;

        const compareResult1 = service.comparePro(entity1, entity2);
        const compareResult2 = service.comparePro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
        const entity2 = { id: '51c2a82e-2882-4f42-828d-dd2e6ecb1706' };

        const compareResult1 = service.comparePro(entity1, entity2);
        const compareResult2 = service.comparePro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };
        const entity2 = { id: 'ef347a55-b933-4feb-b2d3-da1c5d21ac12' };

        const compareResult1 = service.comparePro(entity1, entity2);
        const compareResult2 = service.comparePro(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
