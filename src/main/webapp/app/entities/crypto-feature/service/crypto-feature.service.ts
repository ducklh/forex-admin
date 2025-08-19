import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICryptoFeature, NewCryptoFeature } from '../crypto-feature.model';

export type PartialUpdateCryptoFeature = Partial<ICryptoFeature> & Pick<ICryptoFeature, 'id'>;

export type EntityResponseType = HttpResponse<ICryptoFeature>;
export type EntityArrayResponseType = HttpResponse<ICryptoFeature[]>;

@Injectable({ providedIn: 'root' })
export class CryptoFeatureService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crypto-features');

  create(cryptoFeature: NewCryptoFeature): Observable<EntityResponseType> {
    return this.http.post<ICryptoFeature>(this.resourceUrl, cryptoFeature, { observe: 'response' });
  }

  update(cryptoFeature: ICryptoFeature): Observable<EntityResponseType> {
    return this.http.put<ICryptoFeature>(`${this.resourceUrl}/${this.getCryptoFeatureIdentifier(cryptoFeature)}`, cryptoFeature, {
      observe: 'response',
    });
  }

  partialUpdate(cryptoFeature: PartialUpdateCryptoFeature): Observable<EntityResponseType> {
    return this.http.patch<ICryptoFeature>(`${this.resourceUrl}/${this.getCryptoFeatureIdentifier(cryptoFeature)}`, cryptoFeature, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICryptoFeature>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICryptoFeature[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCryptoFeatureIdentifier(cryptoFeature: Pick<ICryptoFeature, 'id'>): string {
    return cryptoFeature.id;
  }

  compareCryptoFeature(o1: Pick<ICryptoFeature, 'id'> | null, o2: Pick<ICryptoFeature, 'id'> | null): boolean {
    return o1 && o2 ? this.getCryptoFeatureIdentifier(o1) === this.getCryptoFeatureIdentifier(o2) : o1 === o2;
  }

  addCryptoFeatureToCollectionIfMissing<Type extends Pick<ICryptoFeature, 'id'>>(
    cryptoFeatureCollection: Type[],
    ...cryptoFeaturesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cryptoFeatures: Type[] = cryptoFeaturesToCheck.filter(isPresent);
    if (cryptoFeatures.length > 0) {
      const cryptoFeatureCollectionIdentifiers = cryptoFeatureCollection.map(cryptoFeatureItem =>
        this.getCryptoFeatureIdentifier(cryptoFeatureItem),
      );
      const cryptoFeaturesToAdd = cryptoFeatures.filter(cryptoFeatureItem => {
        const cryptoFeatureIdentifier = this.getCryptoFeatureIdentifier(cryptoFeatureItem);
        if (cryptoFeatureCollectionIdentifiers.includes(cryptoFeatureIdentifier)) {
          return false;
        }
        cryptoFeatureCollectionIdentifiers.push(cryptoFeatureIdentifier);
        return true;
      });
      return [...cryptoFeaturesToAdd, ...cryptoFeatureCollection];
    }
    return cryptoFeatureCollection;
  }
}
