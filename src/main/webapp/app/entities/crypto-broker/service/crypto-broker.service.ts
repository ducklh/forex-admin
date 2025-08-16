import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICryptoBroker, NewCryptoBroker } from '../crypto-broker.model';

export type PartialUpdateCryptoBroker = Partial<ICryptoBroker> & Pick<ICryptoBroker, 'id'>;

export type EntityResponseType = HttpResponse<ICryptoBroker>;
export type EntityArrayResponseType = HttpResponse<ICryptoBroker[]>;

@Injectable({ providedIn: 'root' })
export class CryptoBrokerService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crypto-brokers');

  create(cryptoBroker: NewCryptoBroker): Observable<EntityResponseType> {
    return this.http.post<ICryptoBroker>(this.resourceUrl, cryptoBroker, { observe: 'response' });
  }

  update(cryptoBroker: ICryptoBroker): Observable<EntityResponseType> {
    return this.http.put<ICryptoBroker>(`${this.resourceUrl}/${this.getCryptoBrokerIdentifier(cryptoBroker)}`, cryptoBroker, {
      observe: 'response',
    });
  }

  partialUpdate(cryptoBroker: PartialUpdateCryptoBroker): Observable<EntityResponseType> {
    return this.http.patch<ICryptoBroker>(`${this.resourceUrl}/${this.getCryptoBrokerIdentifier(cryptoBroker)}`, cryptoBroker, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICryptoBroker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICryptoBroker[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCryptoBrokerIdentifier(cryptoBroker: Pick<ICryptoBroker, 'id'>): string {
    return cryptoBroker.id;
  }

  compareCryptoBroker(o1: Pick<ICryptoBroker, 'id'> | null, o2: Pick<ICryptoBroker, 'id'> | null): boolean {
    return o1 && o2 ? this.getCryptoBrokerIdentifier(o1) === this.getCryptoBrokerIdentifier(o2) : o1 === o2;
  }

  addCryptoBrokerToCollectionIfMissing<Type extends Pick<ICryptoBroker, 'id'>>(
    cryptoBrokerCollection: Type[],
    ...cryptoBrokersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cryptoBrokers: Type[] = cryptoBrokersToCheck.filter(isPresent);
    if (cryptoBrokers.length > 0) {
      const cryptoBrokerCollectionIdentifiers = cryptoBrokerCollection.map(cryptoBrokerItem =>
        this.getCryptoBrokerIdentifier(cryptoBrokerItem),
      );
      const cryptoBrokersToAdd = cryptoBrokers.filter(cryptoBrokerItem => {
        const cryptoBrokerIdentifier = this.getCryptoBrokerIdentifier(cryptoBrokerItem);
        if (cryptoBrokerCollectionIdentifiers.includes(cryptoBrokerIdentifier)) {
          return false;
        }
        cryptoBrokerCollectionIdentifiers.push(cryptoBrokerIdentifier);
        return true;
      });
      return [...cryptoBrokersToAdd, ...cryptoBrokerCollection];
    }
    return cryptoBrokerCollection;
  }
}
