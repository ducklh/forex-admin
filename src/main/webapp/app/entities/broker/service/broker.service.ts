import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBroker, NewBroker } from '../broker.model';

export type PartialUpdateBroker = Partial<IBroker> & Pick<IBroker, 'id'>;

export type EntityResponseType = HttpResponse<IBroker>;
export type EntityArrayResponseType = HttpResponse<IBroker[]>;

@Injectable({ providedIn: 'root' })
export class BrokerService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/brokers');

  create(broker: NewBroker): Observable<EntityResponseType> {
    return this.http.post<IBroker>(this.resourceUrl, broker, { observe: 'response' });
  }

  update(broker: IBroker): Observable<EntityResponseType> {
    return this.http.put<IBroker>(`${this.resourceUrl}/${this.getBrokerIdentifier(broker)}`, broker, { observe: 'response' });
  }

  partialUpdate(broker: PartialUpdateBroker): Observable<EntityResponseType> {
    return this.http.patch<IBroker>(`${this.resourceUrl}/${this.getBrokerIdentifier(broker)}`, broker, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IBroker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBroker[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBrokerIdentifier(broker: Pick<IBroker, 'id'>): string {
    return broker.id;
  }

  compareBroker(o1: Pick<IBroker, 'id'> | null, o2: Pick<IBroker, 'id'> | null): boolean {
    return o1 && o2 ? this.getBrokerIdentifier(o1) === this.getBrokerIdentifier(o2) : o1 === o2;
  }

  addBrokerToCollectionIfMissing<Type extends Pick<IBroker, 'id'>>(
    brokerCollection: Type[],
    ...brokersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const brokers: Type[] = brokersToCheck.filter(isPresent);
    if (brokers.length > 0) {
      const brokerCollectionIdentifiers = brokerCollection.map(brokerItem => this.getBrokerIdentifier(brokerItem));
      const brokersToAdd = brokers.filter(brokerItem => {
        const brokerIdentifier = this.getBrokerIdentifier(brokerItem);
        if (brokerCollectionIdentifiers.includes(brokerIdentifier)) {
          return false;
        }
        brokerCollectionIdentifiers.push(brokerIdentifier);
        return true;
      });
      return [...brokersToAdd, ...brokerCollection];
    }
    return brokerCollection;
  }
}
