import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IKnowledgeTag } from '../knowledge-tag.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../knowledge-tag.test-samples';

import { KnowledgeTagService } from './knowledge-tag.service';

const requireRestSample: IKnowledgeTag = {
  ...sampleWithRequiredData,
};

describe('KnowledgeTag Service', () => {
  let service: KnowledgeTagService;
  let httpMock: HttpTestingController;
  let expectedResult: IKnowledgeTag | IKnowledgeTag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(KnowledgeTagService);
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

    it('should create a KnowledgeTag', () => {
      const knowledgeTag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(knowledgeTag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KnowledgeTag', () => {
      const knowledgeTag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(knowledgeTag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KnowledgeTag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KnowledgeTag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KnowledgeTag', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKnowledgeTagToCollectionIfMissing', () => {
      it('should add a KnowledgeTag to an empty array', () => {
        const knowledgeTag: IKnowledgeTag = sampleWithRequiredData;
        expectedResult = service.addKnowledgeTagToCollectionIfMissing([], knowledgeTag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knowledgeTag);
      });

      it('should not add a KnowledgeTag to an array that contains it', () => {
        const knowledgeTag: IKnowledgeTag = sampleWithRequiredData;
        const knowledgeTagCollection: IKnowledgeTag[] = [
          {
            ...knowledgeTag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKnowledgeTagToCollectionIfMissing(knowledgeTagCollection, knowledgeTag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KnowledgeTag to an array that doesn't contain it", () => {
        const knowledgeTag: IKnowledgeTag = sampleWithRequiredData;
        const knowledgeTagCollection: IKnowledgeTag[] = [sampleWithPartialData];
        expectedResult = service.addKnowledgeTagToCollectionIfMissing(knowledgeTagCollection, knowledgeTag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knowledgeTag);
      });

      it('should add only unique KnowledgeTag to an array', () => {
        const knowledgeTagArray: IKnowledgeTag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const knowledgeTagCollection: IKnowledgeTag[] = [sampleWithRequiredData];
        expectedResult = service.addKnowledgeTagToCollectionIfMissing(knowledgeTagCollection, ...knowledgeTagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const knowledgeTag: IKnowledgeTag = sampleWithRequiredData;
        const knowledgeTag2: IKnowledgeTag = sampleWithPartialData;
        expectedResult = service.addKnowledgeTagToCollectionIfMissing([], knowledgeTag, knowledgeTag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knowledgeTag);
        expect(expectedResult).toContain(knowledgeTag2);
      });

      it('should accept null and undefined values', () => {
        const knowledgeTag: IKnowledgeTag = sampleWithRequiredData;
        expectedResult = service.addKnowledgeTagToCollectionIfMissing([], null, knowledgeTag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knowledgeTag);
      });

      it('should return initial array if no KnowledgeTag is added', () => {
        const knowledgeTagCollection: IKnowledgeTag[] = [sampleWithRequiredData];
        expectedResult = service.addKnowledgeTagToCollectionIfMissing(knowledgeTagCollection, undefined, null);
        expect(expectedResult).toEqual(knowledgeTagCollection);
      });
    });

    describe('compareKnowledgeTag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKnowledgeTag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
        const entity2 = null;

        const compareResult1 = service.compareKnowledgeTag(entity1, entity2);
        const compareResult2 = service.compareKnowledgeTag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
        const entity2 = { id: '2e3a5c16-9ac0-49dd-bc5c-1722ca706303' };

        const compareResult1 = service.compareKnowledgeTag(entity1, entity2);
        const compareResult2 = service.compareKnowledgeTag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };
        const entity2 = { id: '4439ed2a-fde8-47cb-af87-1a9f52d4fbfe' };

        const compareResult1 = service.compareKnowledgeTag(entity1, entity2);
        const compareResult2 = service.compareKnowledgeTag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
