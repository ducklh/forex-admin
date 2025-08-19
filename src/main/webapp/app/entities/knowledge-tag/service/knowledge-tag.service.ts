import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKnowledgeTag, NewKnowledgeTag } from '../knowledge-tag.model';

export type PartialUpdateKnowledgeTag = Partial<IKnowledgeTag> & Pick<IKnowledgeTag, 'id'>;

export type EntityResponseType = HttpResponse<IKnowledgeTag>;
export type EntityArrayResponseType = HttpResponse<IKnowledgeTag[]>;

@Injectable({ providedIn: 'root' })
export class KnowledgeTagService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/knowledge-tags');

  create(knowledgeTag: NewKnowledgeTag): Observable<EntityResponseType> {
    return this.http.post<IKnowledgeTag>(this.resourceUrl, knowledgeTag, { observe: 'response' });
  }

  update(knowledgeTag: IKnowledgeTag): Observable<EntityResponseType> {
    return this.http.put<IKnowledgeTag>(`${this.resourceUrl}/${this.getKnowledgeTagIdentifier(knowledgeTag)}`, knowledgeTag, {
      observe: 'response',
    });
  }

  partialUpdate(knowledgeTag: PartialUpdateKnowledgeTag): Observable<EntityResponseType> {
    return this.http.patch<IKnowledgeTag>(`${this.resourceUrl}/${this.getKnowledgeTagIdentifier(knowledgeTag)}`, knowledgeTag, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IKnowledgeTag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKnowledgeTag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKnowledgeTagIdentifier(knowledgeTag: Pick<IKnowledgeTag, 'id'>): string {
    return knowledgeTag.id;
  }

  compareKnowledgeTag(o1: Pick<IKnowledgeTag, 'id'> | null, o2: Pick<IKnowledgeTag, 'id'> | null): boolean {
    return o1 && o2 ? this.getKnowledgeTagIdentifier(o1) === this.getKnowledgeTagIdentifier(o2) : o1 === o2;
  }

  addKnowledgeTagToCollectionIfMissing<Type extends Pick<IKnowledgeTag, 'id'>>(
    knowledgeTagCollection: Type[],
    ...knowledgeTagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const knowledgeTags: Type[] = knowledgeTagsToCheck.filter(isPresent);
    if (knowledgeTags.length > 0) {
      const knowledgeTagCollectionIdentifiers = knowledgeTagCollection.map(knowledgeTagItem =>
        this.getKnowledgeTagIdentifier(knowledgeTagItem),
      );
      const knowledgeTagsToAdd = knowledgeTags.filter(knowledgeTagItem => {
        const knowledgeTagIdentifier = this.getKnowledgeTagIdentifier(knowledgeTagItem);
        if (knowledgeTagCollectionIdentifiers.includes(knowledgeTagIdentifier)) {
          return false;
        }
        knowledgeTagCollectionIdentifiers.push(knowledgeTagIdentifier);
        return true;
      });
      return [...knowledgeTagsToAdd, ...knowledgeTagCollection];
    }
    return knowledgeTagCollection;
  }
}
