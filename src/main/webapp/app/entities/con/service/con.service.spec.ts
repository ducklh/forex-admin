import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICon } from '../con.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../con.test-samples';

import { ConService } from './con.service';

const requireRestSample: ICon = {
  ...sampleWithRequiredData,
};

describe('Con Service', () => {
  let service: ConService;
  let httpMock: HttpTestingController;
  let expectedResult: ICon | ICon[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ConService);
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

    it('should create a Con', () => {
      const con = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(con).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Con', () => {
      const con = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(con).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Con', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Con', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Con', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConToCollectionIfMissing', () => {
      it('should add a Con to an empty array', () => {
        const con: ICon = sampleWithRequiredData;
        expectedResult = service.addConToCollectionIfMissing([], con);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(con);
      });

      it('should not add a Con to an array that contains it', () => {
        const con: ICon = sampleWithRequiredData;
        const conCollection: ICon[] = [
          {
            ...con,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConToCollectionIfMissing(conCollection, con);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Con to an array that doesn't contain it", () => {
        const con: ICon = sampleWithRequiredData;
        const conCollection: ICon[] = [sampleWithPartialData];
        expectedResult = service.addConToCollectionIfMissing(conCollection, con);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(con);
      });

      it('should add only unique Con to an array', () => {
        const conArray: ICon[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const conCollection: ICon[] = [sampleWithRequiredData];
        expectedResult = service.addConToCollectionIfMissing(conCollection, ...conArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const con: ICon = sampleWithRequiredData;
        const con2: ICon = sampleWithPartialData;
        expectedResult = service.addConToCollectionIfMissing([], con, con2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(con);
        expect(expectedResult).toContain(con2);
      });

      it('should accept null and undefined values', () => {
        const con: ICon = sampleWithRequiredData;
        expectedResult = service.addConToCollectionIfMissing([], null, con, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(con);
      });

      it('should return initial array if no Con is added', () => {
        const conCollection: ICon[] = [sampleWithRequiredData];
        expectedResult = service.addConToCollectionIfMissing(conCollection, undefined, null);
        expect(expectedResult).toEqual(conCollection);
      });
    });

    describe('compareCon', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCon(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
        const entity2 = null;

        const compareResult1 = service.compareCon(entity1, entity2);
        const compareResult2 = service.compareCon(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
        const entity2 = { id: '43b4c2f3-48b1-4d37-96b9-0fa888aafa43' };

        const compareResult1 = service.compareCon(entity1, entity2);
        const compareResult2 = service.compareCon(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };
        const entity2 = { id: '0523e79a-da4e-4267-bf59-3ed8eff677f0' };

        const compareResult1 = service.compareCon(entity1, entity2);
        const compareResult2 = service.compareCon(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
