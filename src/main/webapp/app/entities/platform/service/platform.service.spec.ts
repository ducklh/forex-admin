import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IPlatform } from '../platform.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../platform.test-samples';

import { PlatformService } from './platform.service';

const requireRestSample: IPlatform = {
  ...sampleWithRequiredData,
};

describe('Platform Service', () => {
  let service: PlatformService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlatform | IPlatform[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(PlatformService);
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

    it('should create a Platform', () => {
      const platform = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(platform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Platform', () => {
      const platform = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(platform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Platform', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Platform', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Platform', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlatformToCollectionIfMissing', () => {
      it('should add a Platform to an empty array', () => {
        const platform: IPlatform = sampleWithRequiredData;
        expectedResult = service.addPlatformToCollectionIfMissing([], platform);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(platform);
      });

      it('should not add a Platform to an array that contains it', () => {
        const platform: IPlatform = sampleWithRequiredData;
        const platformCollection: IPlatform[] = [
          {
            ...platform,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlatformToCollectionIfMissing(platformCollection, platform);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Platform to an array that doesn't contain it", () => {
        const platform: IPlatform = sampleWithRequiredData;
        const platformCollection: IPlatform[] = [sampleWithPartialData];
        expectedResult = service.addPlatformToCollectionIfMissing(platformCollection, platform);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(platform);
      });

      it('should add only unique Platform to an array', () => {
        const platformArray: IPlatform[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const platformCollection: IPlatform[] = [sampleWithRequiredData];
        expectedResult = service.addPlatformToCollectionIfMissing(platformCollection, ...platformArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const platform: IPlatform = sampleWithRequiredData;
        const platform2: IPlatform = sampleWithPartialData;
        expectedResult = service.addPlatformToCollectionIfMissing([], platform, platform2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(platform);
        expect(expectedResult).toContain(platform2);
      });

      it('should accept null and undefined values', () => {
        const platform: IPlatform = sampleWithRequiredData;
        expectedResult = service.addPlatformToCollectionIfMissing([], null, platform, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(platform);
      });

      it('should return initial array if no Platform is added', () => {
        const platformCollection: IPlatform[] = [sampleWithRequiredData];
        expectedResult = service.addPlatformToCollectionIfMissing(platformCollection, undefined, null);
        expect(expectedResult).toEqual(platformCollection);
      });
    });

    describe('comparePlatform', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlatform(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
        const entity2 = null;

        const compareResult1 = service.comparePlatform(entity1, entity2);
        const compareResult2 = service.comparePlatform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
        const entity2 = { id: 'adc9c792-7529-4e73-88ad-9faef0937c79' };

        const compareResult1 = service.comparePlatform(entity1, entity2);
        const compareResult2 = service.comparePlatform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };
        const entity2 = { id: '2368b766-4eae-434c-b330-4997a5ab5113' };

        const compareResult1 = service.comparePlatform(entity1, entity2);
        const compareResult2 = service.comparePlatform(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
