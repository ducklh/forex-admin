import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKnowledgeItem, NewKnowledgeItem } from '../knowledge-item.model';

export type PartialUpdateKnowledgeItem = Partial<IKnowledgeItem> & Pick<IKnowledgeItem, 'id'>;

type RestOf<T extends IKnowledgeItem | NewKnowledgeItem> = Omit<T, 'publishedAt'> & {
  publishedAt?: string | null;
};

export type RestKnowledgeItem = RestOf<IKnowledgeItem>;

export type NewRestKnowledgeItem = RestOf<NewKnowledgeItem>;

export type PartialUpdateRestKnowledgeItem = RestOf<PartialUpdateKnowledgeItem>;

export type EntityResponseType = HttpResponse<IKnowledgeItem>;
export type EntityArrayResponseType = HttpResponse<IKnowledgeItem[]>;

@Injectable({ providedIn: 'root' })
export class KnowledgeItemService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/knowledge-items');

  create(knowledgeItem: NewKnowledgeItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(knowledgeItem);
    return this.http
      .post<RestKnowledgeItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(knowledgeItem: IKnowledgeItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(knowledgeItem);
    return this.http
      .put<RestKnowledgeItem>(`${this.resourceUrl}/${this.getKnowledgeItemIdentifier(knowledgeItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(knowledgeItem: PartialUpdateKnowledgeItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(knowledgeItem);
    return this.http
      .patch<RestKnowledgeItem>(`${this.resourceUrl}/${this.getKnowledgeItemIdentifier(knowledgeItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestKnowledgeItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestKnowledgeItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKnowledgeItemIdentifier(knowledgeItem: Pick<IKnowledgeItem, 'id'>): string {
    return knowledgeItem.id;
  }

  compareKnowledgeItem(o1: Pick<IKnowledgeItem, 'id'> | null, o2: Pick<IKnowledgeItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getKnowledgeItemIdentifier(o1) === this.getKnowledgeItemIdentifier(o2) : o1 === o2;
  }

  addKnowledgeItemToCollectionIfMissing<Type extends Pick<IKnowledgeItem, 'id'>>(
    knowledgeItemCollection: Type[],
    ...knowledgeItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const knowledgeItems: Type[] = knowledgeItemsToCheck.filter(isPresent);
    if (knowledgeItems.length > 0) {
      const knowledgeItemCollectionIdentifiers = knowledgeItemCollection.map(knowledgeItemItem =>
        this.getKnowledgeItemIdentifier(knowledgeItemItem),
      );
      const knowledgeItemsToAdd = knowledgeItems.filter(knowledgeItemItem => {
        const knowledgeItemIdentifier = this.getKnowledgeItemIdentifier(knowledgeItemItem);
        if (knowledgeItemCollectionIdentifiers.includes(knowledgeItemIdentifier)) {
          return false;
        }
        knowledgeItemCollectionIdentifiers.push(knowledgeItemIdentifier);
        return true;
      });
      return [...knowledgeItemsToAdd, ...knowledgeItemCollection];
    }
    return knowledgeItemCollection;
  }

  protected convertDateFromClient<T extends IKnowledgeItem | NewKnowledgeItem | PartialUpdateKnowledgeItem>(knowledgeItem: T): RestOf<T> {
    return {
      ...knowledgeItem,
      publishedAt: knowledgeItem.publishedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restKnowledgeItem: RestKnowledgeItem): IKnowledgeItem {
    return {
      ...restKnowledgeItem,
      publishedAt: restKnowledgeItem.publishedAt ? dayjs(restKnowledgeItem.publishedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestKnowledgeItem>): HttpResponse<IKnowledgeItem> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestKnowledgeItem[]>): HttpResponse<IKnowledgeItem[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
