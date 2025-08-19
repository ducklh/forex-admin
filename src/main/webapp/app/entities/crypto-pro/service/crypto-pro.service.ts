import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICryptoPro, NewCryptoPro } from '../crypto-pro.model';

export type PartialUpdateCryptoPro = Partial<ICryptoPro> & Pick<ICryptoPro, 'id'>;

export type EntityResponseType = HttpResponse<ICryptoPro>;
export type EntityArrayResponseType = HttpResponse<ICryptoPro[]>;

@Injectable({ providedIn: 'root' })
export class CryptoProService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crypto-pros');

  create(cryptoPro: NewCryptoPro): Observable<EntityResponseType> {
    return this.http.post<ICryptoPro>(this.resourceUrl, cryptoPro, { observe: 'response' });
  }

  update(cryptoPro: ICryptoPro): Observable<EntityResponseType> {
    return this.http.put<ICryptoPro>(`${this.resourceUrl}/${this.getCryptoProIdentifier(cryptoPro)}`, cryptoPro, { observe: 'response' });
  }

  partialUpdate(cryptoPro: PartialUpdateCryptoPro): Observable<EntityResponseType> {
    return this.http.patch<ICryptoPro>(`${this.resourceUrl}/${this.getCryptoProIdentifier(cryptoPro)}`, cryptoPro, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICryptoPro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICryptoPro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCryptoProIdentifier(cryptoPro: Pick<ICryptoPro, 'id'>): string {
    return cryptoPro.id;
  }

  compareCryptoPro(o1: Pick<ICryptoPro, 'id'> | null, o2: Pick<ICryptoPro, 'id'> | null): boolean {
    return o1 && o2 ? this.getCryptoProIdentifier(o1) === this.getCryptoProIdentifier(o2) : o1 === o2;
  }

  addCryptoProToCollectionIfMissing<Type extends Pick<ICryptoPro, 'id'>>(
    cryptoProCollection: Type[],
    ...cryptoProsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cryptoPros: Type[] = cryptoProsToCheck.filter(isPresent);
    if (cryptoPros.length > 0) {
      const cryptoProCollectionIdentifiers = cryptoProCollection.map(cryptoProItem => this.getCryptoProIdentifier(cryptoProItem));
      const cryptoProsToAdd = cryptoPros.filter(cryptoProItem => {
        const cryptoProIdentifier = this.getCryptoProIdentifier(cryptoProItem);
        if (cryptoProCollectionIdentifiers.includes(cryptoProIdentifier)) {
          return false;
        }
        cryptoProCollectionIdentifiers.push(cryptoProIdentifier);
        return true;
      });
      return [...cryptoProsToAdd, ...cryptoProCollection];
    }
    return cryptoProCollection;
  }
}
