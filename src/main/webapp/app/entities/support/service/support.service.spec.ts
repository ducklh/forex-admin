import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISupport } from '../support.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../support.test-samples';

import { SupportService } from './support.service';

const requireRestSample: ISupport = {
  ...sampleWithRequiredData,
};

describe('Support Service', () => {
  let service: SupportService;
  let httpMock: HttpTestingController;
  let expectedResult: ISupport | ISupport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SupportService);
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

    it('should create a Support', () => {
      const support = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(support).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Support', () => {
      const support = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(support).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Support', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Support', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Support', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSupportToCollectionIfMissing', () => {
      it('should add a Support to an empty array', () => {
        const support: ISupport = sampleWithRequiredData;
        expectedResult = service.addSupportToCollectionIfMissing([], support);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(support);
      });

      it('should not add a Support to an array that contains it', () => {
        const support: ISupport = sampleWithRequiredData;
        const supportCollection: ISupport[] = [
          {
            ...support,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSupportToCollectionIfMissing(supportCollection, support);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Support to an array that doesn't contain it", () => {
        const support: ISupport = sampleWithRequiredData;
        const supportCollection: ISupport[] = [sampleWithPartialData];
        expectedResult = service.addSupportToCollectionIfMissing(supportCollection, support);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(support);
      });

      it('should add only unique Support to an array', () => {
        const supportArray: ISupport[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const supportCollection: ISupport[] = [sampleWithRequiredData];
        expectedResult = service.addSupportToCollectionIfMissing(supportCollection, ...supportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const support: ISupport = sampleWithRequiredData;
        const support2: ISupport = sampleWithPartialData;
        expectedResult = service.addSupportToCollectionIfMissing([], support, support2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(support);
        expect(expectedResult).toContain(support2);
      });

      it('should accept null and undefined values', () => {
        const support: ISupport = sampleWithRequiredData;
        expectedResult = service.addSupportToCollectionIfMissing([], null, support, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(support);
      });

      it('should return initial array if no Support is added', () => {
        const supportCollection: ISupport[] = [sampleWithRequiredData];
        expectedResult = service.addSupportToCollectionIfMissing(supportCollection, undefined, null);
        expect(expectedResult).toEqual(supportCollection);
      });
    });

    describe('compareSupport', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSupport(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
        const entity2 = null;

        const compareResult1 = service.compareSupport(entity1, entity2);
        const compareResult2 = service.compareSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
        const entity2 = { id: 'db11bf8a-9a0c-49c7-9ec8-a0a719eedaea' };

        const compareResult1 = service.compareSupport(entity1, entity2);
        const compareResult2 = service.compareSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };
        const entity2 = { id: '38fdd302-fdac-4991-a312-3b5f37ce007d' };

        const compareResult1 = service.compareSupport(entity1, entity2);
        const compareResult2 = service.compareSupport(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
