import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISecurityFeature } from '../security-feature.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../security-feature.test-samples';

import { SecurityFeatureService } from './security-feature.service';

const requireRestSample: ISecurityFeature = {
  ...sampleWithRequiredData,
};

describe('SecurityFeature Service', () => {
  let service: SecurityFeatureService;
  let httpMock: HttpTestingController;
  let expectedResult: ISecurityFeature | ISecurityFeature[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SecurityFeatureService);
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

    it('should create a SecurityFeature', () => {
      const securityFeature = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(securityFeature).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecurityFeature', () => {
      const securityFeature = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(securityFeature).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecurityFeature', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecurityFeature', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SecurityFeature', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSecurityFeatureToCollectionIfMissing', () => {
      it('should add a SecurityFeature to an empty array', () => {
        const securityFeature: ISecurityFeature = sampleWithRequiredData;
        expectedResult = service.addSecurityFeatureToCollectionIfMissing([], securityFeature);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityFeature);
      });

      it('should not add a SecurityFeature to an array that contains it', () => {
        const securityFeature: ISecurityFeature = sampleWithRequiredData;
        const securityFeatureCollection: ISecurityFeature[] = [
          {
            ...securityFeature,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSecurityFeatureToCollectionIfMissing(securityFeatureCollection, securityFeature);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecurityFeature to an array that doesn't contain it", () => {
        const securityFeature: ISecurityFeature = sampleWithRequiredData;
        const securityFeatureCollection: ISecurityFeature[] = [sampleWithPartialData];
        expectedResult = service.addSecurityFeatureToCollectionIfMissing(securityFeatureCollection, securityFeature);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityFeature);
      });

      it('should add only unique SecurityFeature to an array', () => {
        const securityFeatureArray: ISecurityFeature[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const securityFeatureCollection: ISecurityFeature[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityFeatureToCollectionIfMissing(securityFeatureCollection, ...securityFeatureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const securityFeature: ISecurityFeature = sampleWithRequiredData;
        const securityFeature2: ISecurityFeature = sampleWithPartialData;
        expectedResult = service.addSecurityFeatureToCollectionIfMissing([], securityFeature, securityFeature2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(securityFeature);
        expect(expectedResult).toContain(securityFeature2);
      });

      it('should accept null and undefined values', () => {
        const securityFeature: ISecurityFeature = sampleWithRequiredData;
        expectedResult = service.addSecurityFeatureToCollectionIfMissing([], null, securityFeature, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(securityFeature);
      });

      it('should return initial array if no SecurityFeature is added', () => {
        const securityFeatureCollection: ISecurityFeature[] = [sampleWithRequiredData];
        expectedResult = service.addSecurityFeatureToCollectionIfMissing(securityFeatureCollection, undefined, null);
        expect(expectedResult).toEqual(securityFeatureCollection);
      });
    });

    describe('compareSecurityFeature', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSecurityFeature(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
        const entity2 = null;

        const compareResult1 = service.compareSecurityFeature(entity1, entity2);
        const compareResult2 = service.compareSecurityFeature(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
        const entity2 = { id: 'a4c13296-965d-4a9e-8bd6-d2e862c7f82e' };

        const compareResult1 = service.compareSecurityFeature(entity1, entity2);
        const compareResult2 = service.compareSecurityFeature(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };
        const entity2 = { id: '4e413771-c7d3-4014-b303-c4386d933f82' };

        const compareResult1 = service.compareSecurityFeature(entity1, entity2);
        const compareResult2 = service.compareSecurityFeature(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
