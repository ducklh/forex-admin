import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICoin, NewCoin } from '../coin.model';

export type PartialUpdateCoin = Partial<ICoin> & Pick<ICoin, 'id'>;

export type EntityResponseType = HttpResponse<ICoin>;
export type EntityArrayResponseType = HttpResponse<ICoin[]>;

@Injectable({ providedIn: 'root' })
export class CoinService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/coins');

  create(coin: NewCoin): Observable<EntityResponseType> {
    return this.http.post<ICoin>(this.resourceUrl, coin, { observe: 'response' });
  }

  update(coin: ICoin): Observable<EntityResponseType> {
    return this.http.put<ICoin>(`${this.resourceUrl}/${this.getCoinIdentifier(coin)}`, coin, { observe: 'response' });
  }

  partialUpdate(coin: PartialUpdateCoin): Observable<EntityResponseType> {
    return this.http.patch<ICoin>(`${this.resourceUrl}/${this.getCoinIdentifier(coin)}`, coin, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICoin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCoinIdentifier(coin: Pick<ICoin, 'id'>): string {
    return coin.id;
  }

  compareCoin(o1: Pick<ICoin, 'id'> | null, o2: Pick<ICoin, 'id'> | null): boolean {
    return o1 && o2 ? this.getCoinIdentifier(o1) === this.getCoinIdentifier(o2) : o1 === o2;
  }

  addCoinToCollectionIfMissing<Type extends Pick<ICoin, 'id'>>(
    coinCollection: Type[],
    ...coinsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const coins: Type[] = coinsToCheck.filter(isPresent);
    if (coins.length > 0) {
      const coinCollectionIdentifiers = coinCollection.map(coinItem => this.getCoinIdentifier(coinItem));
      const coinsToAdd = coins.filter(coinItem => {
        const coinIdentifier = this.getCoinIdentifier(coinItem);
        if (coinCollectionIdentifiers.includes(coinIdentifier)) {
          return false;
        }
        coinCollectionIdentifiers.push(coinIdentifier);
        return true;
      });
      return [...coinsToAdd, ...coinCollection];
    }
    return coinCollection;
  }
}
