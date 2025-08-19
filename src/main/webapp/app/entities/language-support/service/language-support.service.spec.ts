import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILanguageSupport } from '../language-support.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../language-support.test-samples';

import { LanguageSupportService } from './language-support.service';

const requireRestSample: ILanguageSupport = {
  ...sampleWithRequiredData,
};

describe('LanguageSupport Service', () => {
  let service: LanguageSupportService;
  let httpMock: HttpTestingController;
  let expectedResult: ILanguageSupport | ILanguageSupport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LanguageSupportService);
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

    it('should create a LanguageSupport', () => {
      const languageSupport = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(languageSupport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LanguageSupport', () => {
      const languageSupport = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(languageSupport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LanguageSupport', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LanguageSupport', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LanguageSupport', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLanguageSupportToCollectionIfMissing', () => {
      it('should add a LanguageSupport to an empty array', () => {
        const languageSupport: ILanguageSupport = sampleWithRequiredData;
        expectedResult = service.addLanguageSupportToCollectionIfMissing([], languageSupport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(languageSupport);
      });

      it('should not add a LanguageSupport to an array that contains it', () => {
        const languageSupport: ILanguageSupport = sampleWithRequiredData;
        const languageSupportCollection: ILanguageSupport[] = [
          {
            ...languageSupport,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLanguageSupportToCollectionIfMissing(languageSupportCollection, languageSupport);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LanguageSupport to an array that doesn't contain it", () => {
        const languageSupport: ILanguageSupport = sampleWithRequiredData;
        const languageSupportCollection: ILanguageSupport[] = [sampleWithPartialData];
        expectedResult = service.addLanguageSupportToCollectionIfMissing(languageSupportCollection, languageSupport);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(languageSupport);
      });

      it('should add only unique LanguageSupport to an array', () => {
        const languageSupportArray: ILanguageSupport[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const languageSupportCollection: ILanguageSupport[] = [sampleWithRequiredData];
        expectedResult = service.addLanguageSupportToCollectionIfMissing(languageSupportCollection, ...languageSupportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const languageSupport: ILanguageSupport = sampleWithRequiredData;
        const languageSupport2: ILanguageSupport = sampleWithPartialData;
        expectedResult = service.addLanguageSupportToCollectionIfMissing([], languageSupport, languageSupport2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(languageSupport);
        expect(expectedResult).toContain(languageSupport2);
      });

      it('should accept null and undefined values', () => {
        const languageSupport: ILanguageSupport = sampleWithRequiredData;
        expectedResult = service.addLanguageSupportToCollectionIfMissing([], null, languageSupport, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(languageSupport);
      });

      it('should return initial array if no LanguageSupport is added', () => {
        const languageSupportCollection: ILanguageSupport[] = [sampleWithRequiredData];
        expectedResult = service.addLanguageSupportToCollectionIfMissing(languageSupportCollection, undefined, null);
        expect(expectedResult).toEqual(languageSupportCollection);
      });
    });

    describe('compareLanguageSupport', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLanguageSupport(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
        const entity2 = null;

        const compareResult1 = service.compareLanguageSupport(entity1, entity2);
        const compareResult2 = service.compareLanguageSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
        const entity2 = { id: '27b0f6b1-b1e4-4479-a46f-4ec971d6a336' };

        const compareResult1 = service.compareLanguageSupport(entity1, entity2);
        const compareResult2 = service.compareLanguageSupport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };
        const entity2 = { id: '35ba5d1c-f976-4a4c-9555-f8933d1e0f2e' };

        const compareResult1 = service.compareLanguageSupport(entity1, entity2);
        const compareResult2 = service.compareLanguageSupport(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
