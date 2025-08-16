import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISupport, NewSupport } from '../support.model';

export type PartialUpdateSupport = Partial<ISupport> & Pick<ISupport, 'id'>;

export type EntityResponseType = HttpResponse<ISupport>;
export type EntityArrayResponseType = HttpResponse<ISupport[]>;

@Injectable({ providedIn: 'root' })
export class SupportService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/supports');

  create(support: NewSupport): Observable<EntityResponseType> {
    return this.http.post<ISupport>(this.resourceUrl, support, { observe: 'response' });
  }

  update(support: ISupport): Observable<EntityResponseType> {
    return this.http.put<ISupport>(`${this.resourceUrl}/${this.getSupportIdentifier(support)}`, support, { observe: 'response' });
  }

  partialUpdate(support: PartialUpdateSupport): Observable<EntityResponseType> {
    return this.http.patch<ISupport>(`${this.resourceUrl}/${this.getSupportIdentifier(support)}`, support, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISupport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSupportIdentifier(support: Pick<ISupport, 'id'>): string {
    return support.id;
  }

  compareSupport(o1: Pick<ISupport, 'id'> | null, o2: Pick<ISupport, 'id'> | null): boolean {
    return o1 && o2 ? this.getSupportIdentifier(o1) === this.getSupportIdentifier(o2) : o1 === o2;
  }

  addSupportToCollectionIfMissing<Type extends Pick<ISupport, 'id'>>(
    supportCollection: Type[],
    ...supportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const supports: Type[] = supportsToCheck.filter(isPresent);
    if (supports.length > 0) {
      const supportCollectionIdentifiers = supportCollection.map(supportItem => this.getSupportIdentifier(supportItem));
      const supportsToAdd = supports.filter(supportItem => {
        const supportIdentifier = this.getSupportIdentifier(supportItem);
        if (supportCollectionIdentifiers.includes(supportIdentifier)) {
          return false;
        }
        supportCollectionIdentifiers.push(supportIdentifier);
        return true;
      });
      return [...supportsToAdd, ...supportCollection];
    }
    return supportCollection;
  }
}
