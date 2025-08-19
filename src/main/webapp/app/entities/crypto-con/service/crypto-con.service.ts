import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICryptoCon, NewCryptoCon } from '../crypto-con.model';

export type PartialUpdateCryptoCon = Partial<ICryptoCon> & Pick<ICryptoCon, 'id'>;

export type EntityResponseType = HttpResponse<ICryptoCon>;
export type EntityArrayResponseType = HttpResponse<ICryptoCon[]>;

@Injectable({ providedIn: 'root' })
export class CryptoConService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crypto-cons');

  create(cryptoCon: NewCryptoCon): Observable<EntityResponseType> {
    return this.http.post<ICryptoCon>(this.resourceUrl, cryptoCon, { observe: 'response' });
  }

  update(cryptoCon: ICryptoCon): Observable<EntityResponseType> {
    return this.http.put<ICryptoCon>(`${this.resourceUrl}/${this.getCryptoConIdentifier(cryptoCon)}`, cryptoCon, { observe: 'response' });
  }

  partialUpdate(cryptoCon: PartialUpdateCryptoCon): Observable<EntityResponseType> {
    return this.http.patch<ICryptoCon>(`${this.resourceUrl}/${this.getCryptoConIdentifier(cryptoCon)}`, cryptoCon, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICryptoCon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICryptoCon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCryptoConIdentifier(cryptoCon: Pick<ICryptoCon, 'id'>): string {
    return cryptoCon.id;
  }

  compareCryptoCon(o1: Pick<ICryptoCon, 'id'> | null, o2: Pick<ICryptoCon, 'id'> | null): boolean {
    return o1 && o2 ? this.getCryptoConIdentifier(o1) === this.getCryptoConIdentifier(o2) : o1 === o2;
  }

  addCryptoConToCollectionIfMissing<Type extends Pick<ICryptoCon, 'id'>>(
    cryptoConCollection: Type[],
    ...cryptoConsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cryptoCons: Type[] = cryptoConsToCheck.filter(isPresent);
    if (cryptoCons.length > 0) {
      const cryptoConCollectionIdentifiers = cryptoConCollection.map(cryptoConItem => this.getCryptoConIdentifier(cryptoConItem));
      const cryptoConsToAdd = cryptoCons.filter(cryptoConItem => {
        const cryptoConIdentifier = this.getCryptoConIdentifier(cryptoConItem);
        if (cryptoConCollectionIdentifiers.includes(cryptoConIdentifier)) {
          return false;
        }
        cryptoConCollectionIdentifiers.push(cryptoConIdentifier);
        return true;
      });
      return [...cryptoConsToAdd, ...cryptoConCollection];
    }
    return cryptoConCollection;
  }
}
