import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISiteNewsArticle } from '../site-news-article.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../site-news-article.test-samples';

import { RestSiteNewsArticle, SiteNewsArticleService } from './site-news-article.service';

const requireRestSample: RestSiteNewsArticle = {
  ...sampleWithRequiredData,
  publishedAt: sampleWithRequiredData.publishedAt?.toJSON(),
};

describe('SiteNewsArticle Service', () => {
  let service: SiteNewsArticleService;
  let httpMock: HttpTestingController;
  let expectedResult: ISiteNewsArticle | ISiteNewsArticle[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SiteNewsArticleService);
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

    it('should create a SiteNewsArticle', () => {
      const siteNewsArticle = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(siteNewsArticle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SiteNewsArticle', () => {
      const siteNewsArticle = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(siteNewsArticle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SiteNewsArticle', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SiteNewsArticle', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SiteNewsArticle', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSiteNewsArticleToCollectionIfMissing', () => {
      it('should add a SiteNewsArticle to an empty array', () => {
        const siteNewsArticle: ISiteNewsArticle = sampleWithRequiredData;
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing([], siteNewsArticle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(siteNewsArticle);
      });

      it('should not add a SiteNewsArticle to an array that contains it', () => {
        const siteNewsArticle: ISiteNewsArticle = sampleWithRequiredData;
        const siteNewsArticleCollection: ISiteNewsArticle[] = [
          {
            ...siteNewsArticle,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing(siteNewsArticleCollection, siteNewsArticle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SiteNewsArticle to an array that doesn't contain it", () => {
        const siteNewsArticle: ISiteNewsArticle = sampleWithRequiredData;
        const siteNewsArticleCollection: ISiteNewsArticle[] = [sampleWithPartialData];
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing(siteNewsArticleCollection, siteNewsArticle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(siteNewsArticle);
      });

      it('should add only unique SiteNewsArticle to an array', () => {
        const siteNewsArticleArray: ISiteNewsArticle[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const siteNewsArticleCollection: ISiteNewsArticle[] = [sampleWithRequiredData];
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing(siteNewsArticleCollection, ...siteNewsArticleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const siteNewsArticle: ISiteNewsArticle = sampleWithRequiredData;
        const siteNewsArticle2: ISiteNewsArticle = sampleWithPartialData;
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing([], siteNewsArticle, siteNewsArticle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(siteNewsArticle);
        expect(expectedResult).toContain(siteNewsArticle2);
      });

      it('should accept null and undefined values', () => {
        const siteNewsArticle: ISiteNewsArticle = sampleWithRequiredData;
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing([], null, siteNewsArticle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(siteNewsArticle);
      });

      it('should return initial array if no SiteNewsArticle is added', () => {
        const siteNewsArticleCollection: ISiteNewsArticle[] = [sampleWithRequiredData];
        expectedResult = service.addSiteNewsArticleToCollectionIfMissing(siteNewsArticleCollection, undefined, null);
        expect(expectedResult).toEqual(siteNewsArticleCollection);
      });
    });

    describe('compareSiteNewsArticle', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSiteNewsArticle(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
        const entity2 = null;

        const compareResult1 = service.compareSiteNewsArticle(entity1, entity2);
        const compareResult2 = service.compareSiteNewsArticle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
        const entity2 = { id: 'dc18da29-04ae-45d6-a07d-933825288b28' };

        const compareResult1 = service.compareSiteNewsArticle(entity1, entity2);
        const compareResult2 = service.compareSiteNewsArticle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };
        const entity2 = { id: '6068c2ca-a56a-45ab-85f1-b24933a34cf3' };

        const compareResult1 = service.compareSiteNewsArticle(entity1, entity2);
        const compareResult2 = service.compareSiteNewsArticle(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
