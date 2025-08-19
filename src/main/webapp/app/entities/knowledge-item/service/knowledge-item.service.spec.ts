import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IKnowledgeItem } from '../knowledge-item.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../knowledge-item.test-samples';

import { KnowledgeItemService, RestKnowledgeItem } from './knowledge-item.service';

const requireRestSample: RestKnowledgeItem = {
  ...sampleWithRequiredData,
  publishedAt: sampleWithRequiredData.publishedAt?.toJSON(),
};

describe('KnowledgeItem Service', () => {
  let service: KnowledgeItemService;
  let httpMock: HttpTestingController;
  let expectedResult: IKnowledgeItem | IKnowledgeItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(KnowledgeItemService);
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

    it('should create a KnowledgeItem', () => {
      const knowledgeItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(knowledgeItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KnowledgeItem', () => {
      const knowledgeItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(knowledgeItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KnowledgeItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KnowledgeItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KnowledgeItem', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKnowledgeItemToCollectionIfMissing', () => {
      it('should add a KnowledgeItem to an empty array', () => {
        const knowledgeItem: IKnowledgeItem = sampleWithRequiredData;
        expectedResult = service.addKnowledgeItemToCollectionIfMissing([], knowledgeItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knowledgeItem);
      });

      it('should not add a KnowledgeItem to an array that contains it', () => {
        const knowledgeItem: IKnowledgeItem = sampleWithRequiredData;
        const knowledgeItemCollection: IKnowledgeItem[] = [
          {
            ...knowledgeItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKnowledgeItemToCollectionIfMissing(knowledgeItemCollection, knowledgeItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KnowledgeItem to an array that doesn't contain it", () => {
        const knowledgeItem: IKnowledgeItem = sampleWithRequiredData;
        const knowledgeItemCollection: IKnowledgeItem[] = [sampleWithPartialData];
        expectedResult = service.addKnowledgeItemToCollectionIfMissing(knowledgeItemCollection, knowledgeItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knowledgeItem);
      });

      it('should add only unique KnowledgeItem to an array', () => {
        const knowledgeItemArray: IKnowledgeItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const knowledgeItemCollection: IKnowledgeItem[] = [sampleWithRequiredData];
        expectedResult = service.addKnowledgeItemToCollectionIfMissing(knowledgeItemCollection, ...knowledgeItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const knowledgeItem: IKnowledgeItem = sampleWithRequiredData;
        const knowledgeItem2: IKnowledgeItem = sampleWithPartialData;
        expectedResult = service.addKnowledgeItemToCollectionIfMissing([], knowledgeItem, knowledgeItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(knowledgeItem);
        expect(expectedResult).toContain(knowledgeItem2);
      });

      it('should accept null and undefined values', () => {
        const knowledgeItem: IKnowledgeItem = sampleWithRequiredData;
        expectedResult = service.addKnowledgeItemToCollectionIfMissing([], null, knowledgeItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(knowledgeItem);
      });

      it('should return initial array if no KnowledgeItem is added', () => {
        const knowledgeItemCollection: IKnowledgeItem[] = [sampleWithRequiredData];
        expectedResult = service.addKnowledgeItemToCollectionIfMissing(knowledgeItemCollection, undefined, null);
        expect(expectedResult).toEqual(knowledgeItemCollection);
      });
    });

    describe('compareKnowledgeItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKnowledgeItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
        const entity2 = null;

        const compareResult1 = service.compareKnowledgeItem(entity1, entity2);
        const compareResult2 = service.compareKnowledgeItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
        const entity2 = { id: '0f9e2a94-e386-4d27-bf52-34b14e98683f' };

        const compareResult1 = service.compareKnowledgeItem(entity1, entity2);
        const compareResult2 = service.compareKnowledgeItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };
        const entity2 = { id: 'd75a3f44-38e9-420f-87ee-c573fd758998' };

        const compareResult1 = service.compareKnowledgeItem(entity1, entity2);
        const compareResult2 = service.compareKnowledgeItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
