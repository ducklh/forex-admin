import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICryptoPaymentMethod, NewCryptoPaymentMethod } from '../crypto-payment-method.model';

export type PartialUpdateCryptoPaymentMethod = Partial<ICryptoPaymentMethod> & Pick<ICryptoPaymentMethod, 'id'>;

export type EntityResponseType = HttpResponse<ICryptoPaymentMethod>;
export type EntityArrayResponseType = HttpResponse<ICryptoPaymentMethod[]>;

@Injectable({ providedIn: 'root' })
export class CryptoPaymentMethodService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crypto-payment-methods');

  create(cryptoPaymentMethod: NewCryptoPaymentMethod): Observable<EntityResponseType> {
    return this.http.post<ICryptoPaymentMethod>(this.resourceUrl, cryptoPaymentMethod, { observe: 'response' });
  }

  update(cryptoPaymentMethod: ICryptoPaymentMethod): Observable<EntityResponseType> {
    return this.http.put<ICryptoPaymentMethod>(
      `${this.resourceUrl}/${this.getCryptoPaymentMethodIdentifier(cryptoPaymentMethod)}`,
      cryptoPaymentMethod,
      { observe: 'response' },
    );
  }

  partialUpdate(cryptoPaymentMethod: PartialUpdateCryptoPaymentMethod): Observable<EntityResponseType> {
    return this.http.patch<ICryptoPaymentMethod>(
      `${this.resourceUrl}/${this.getCryptoPaymentMethodIdentifier(cryptoPaymentMethod)}`,
      cryptoPaymentMethod,
      { observe: 'response' },
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICryptoPaymentMethod>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICryptoPaymentMethod[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCryptoPaymentMethodIdentifier(cryptoPaymentMethod: Pick<ICryptoPaymentMethod, 'id'>): string {
    return cryptoPaymentMethod.id;
  }

  compareCryptoPaymentMethod(o1: Pick<ICryptoPaymentMethod, 'id'> | null, o2: Pick<ICryptoPaymentMethod, 'id'> | null): boolean {
    return o1 && o2 ? this.getCryptoPaymentMethodIdentifier(o1) === this.getCryptoPaymentMethodIdentifier(o2) : o1 === o2;
  }

  addCryptoPaymentMethodToCollectionIfMissing<Type extends Pick<ICryptoPaymentMethod, 'id'>>(
    cryptoPaymentMethodCollection: Type[],
    ...cryptoPaymentMethodsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cryptoPaymentMethods: Type[] = cryptoPaymentMethodsToCheck.filter(isPresent);
    if (cryptoPaymentMethods.length > 0) {
      const cryptoPaymentMethodCollectionIdentifiers = cryptoPaymentMethodCollection.map(cryptoPaymentMethodItem =>
        this.getCryptoPaymentMethodIdentifier(cryptoPaymentMethodItem),
      );
      const cryptoPaymentMethodsToAdd = cryptoPaymentMethods.filter(cryptoPaymentMethodItem => {
        const cryptoPaymentMethodIdentifier = this.getCryptoPaymentMethodIdentifier(cryptoPaymentMethodItem);
        if (cryptoPaymentMethodCollectionIdentifiers.includes(cryptoPaymentMethodIdentifier)) {
          return false;
        }
        cryptoPaymentMethodCollectionIdentifiers.push(cryptoPaymentMethodIdentifier);
        return true;
      });
      return [...cryptoPaymentMethodsToAdd, ...cryptoPaymentMethodCollection];
    }
    return cryptoPaymentMethodCollection;
  }
}
