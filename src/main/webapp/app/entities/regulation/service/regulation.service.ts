import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegulation, NewRegulation } from '../regulation.model';

export type PartialUpdateRegulation = Partial<IRegulation> & Pick<IRegulation, 'id'>;

export type EntityResponseType = HttpResponse<IRegulation>;
export type EntityArrayResponseType = HttpResponse<IRegulation[]>;

@Injectable({ providedIn: 'root' })
export class RegulationService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/regulations');

  create(regulation: NewRegulation): Observable<EntityResponseType> {
    return this.http.post<IRegulation>(this.resourceUrl, regulation, { observe: 'response' });
  }

  update(regulation: IRegulation): Observable<EntityResponseType> {
    return this.http.put<IRegulation>(`${this.resourceUrl}/${this.getRegulationIdentifier(regulation)}`, regulation, {
      observe: 'response',
    });
  }

  partialUpdate(regulation: PartialUpdateRegulation): Observable<EntityResponseType> {
    return this.http.patch<IRegulation>(`${this.resourceUrl}/${this.getRegulationIdentifier(regulation)}`, regulation, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IRegulation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegulation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRegulationIdentifier(regulation: Pick<IRegulation, 'id'>): string {
    return regulation.id;
  }

  compareRegulation(o1: Pick<IRegulation, 'id'> | null, o2: Pick<IRegulation, 'id'> | null): boolean {
    return o1 && o2 ? this.getRegulationIdentifier(o1) === this.getRegulationIdentifier(o2) : o1 === o2;
  }

  addRegulationToCollectionIfMissing<Type extends Pick<IRegulation, 'id'>>(
    regulationCollection: Type[],
    ...regulationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const regulations: Type[] = regulationsToCheck.filter(isPresent);
    if (regulations.length > 0) {
      const regulationCollectionIdentifiers = regulationCollection.map(regulationItem => this.getRegulationIdentifier(regulationItem));
      const regulationsToAdd = regulations.filter(regulationItem => {
        const regulationIdentifier = this.getRegulationIdentifier(regulationItem);
        if (regulationCollectionIdentifiers.includes(regulationIdentifier)) {
          return false;
        }
        regulationCollectionIdentifiers.push(regulationIdentifier);
        return true;
      });
      return [...regulationsToAdd, ...regulationCollection];
    }
    return regulationCollection;
  }
}
