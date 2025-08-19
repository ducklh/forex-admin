import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IForexBroker, NewForexBroker } from '../forex-broker.model';

export type PartialUpdateForexBroker = Partial<IForexBroker> & Pick<IForexBroker, 'id'>;

export type EntityResponseType = HttpResponse<IForexBroker>;
export type EntityArrayResponseType = HttpResponse<IForexBroker[]>;

@Injectable({ providedIn: 'root' })
export class ForexBrokerService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/forex-brokers');

  create(forexBroker: NewForexBroker): Observable<EntityResponseType> {
    return this.http.post<IForexBroker>(this.resourceUrl, forexBroker, { observe: 'response' });
  }

  update(forexBroker: IForexBroker): Observable<EntityResponseType> {
    return this.http.put<IForexBroker>(`${this.resourceUrl}/${this.getForexBrokerIdentifier(forexBroker)}`, forexBroker, {
      observe: 'response',
    });
  }

  partialUpdate(forexBroker: PartialUpdateForexBroker): Observable<EntityResponseType> {
    return this.http.patch<IForexBroker>(`${this.resourceUrl}/${this.getForexBrokerIdentifier(forexBroker)}`, forexBroker, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IForexBroker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IForexBroker[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getForexBrokerIdentifier(forexBroker: Pick<IForexBroker, 'id'>): string {
    return forexBroker.id;
  }

  compareForexBroker(o1: Pick<IForexBroker, 'id'> | null, o2: Pick<IForexBroker, 'id'> | null): boolean {
    return o1 && o2 ? this.getForexBrokerIdentifier(o1) === this.getForexBrokerIdentifier(o2) : o1 === o2;
  }

  addForexBrokerToCollectionIfMissing<Type extends Pick<IForexBroker, 'id'>>(
    forexBrokerCollection: Type[],
    ...forexBrokersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const forexBrokers: Type[] = forexBrokersToCheck.filter(isPresent);
    if (forexBrokers.length > 0) {
      const forexBrokerCollectionIdentifiers = forexBrokerCollection.map(forexBrokerItem => this.getForexBrokerIdentifier(forexBrokerItem));
      const forexBrokersToAdd = forexBrokers.filter(forexBrokerItem => {
        const forexBrokerIdentifier = this.getForexBrokerIdentifier(forexBrokerItem);
        if (forexBrokerCollectionIdentifiers.includes(forexBrokerIdentifier)) {
          return false;
        }
        forexBrokerCollectionIdentifiers.push(forexBrokerIdentifier);
        return true;
      });
      return [...forexBrokersToAdd, ...forexBrokerCollection];
    }
    return forexBrokerCollection;
  }
}
