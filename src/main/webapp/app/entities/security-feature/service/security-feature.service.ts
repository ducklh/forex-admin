import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISecurityFeature, NewSecurityFeature } from '../security-feature.model';

export type PartialUpdateSecurityFeature = Partial<ISecurityFeature> & Pick<ISecurityFeature, 'id'>;

export type EntityResponseType = HttpResponse<ISecurityFeature>;
export type EntityArrayResponseType = HttpResponse<ISecurityFeature[]>;

@Injectable({ providedIn: 'root' })
export class SecurityFeatureService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/security-features');

  create(securityFeature: NewSecurityFeature): Observable<EntityResponseType> {
    return this.http.post<ISecurityFeature>(this.resourceUrl, securityFeature, { observe: 'response' });
  }

  update(securityFeature: ISecurityFeature): Observable<EntityResponseType> {
    return this.http.put<ISecurityFeature>(`${this.resourceUrl}/${this.getSecurityFeatureIdentifier(securityFeature)}`, securityFeature, {
      observe: 'response',
    });
  }

  partialUpdate(securityFeature: PartialUpdateSecurityFeature): Observable<EntityResponseType> {
    return this.http.patch<ISecurityFeature>(`${this.resourceUrl}/${this.getSecurityFeatureIdentifier(securityFeature)}`, securityFeature, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISecurityFeature>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecurityFeature[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSecurityFeatureIdentifier(securityFeature: Pick<ISecurityFeature, 'id'>): string {
    return securityFeature.id;
  }

  compareSecurityFeature(o1: Pick<ISecurityFeature, 'id'> | null, o2: Pick<ISecurityFeature, 'id'> | null): boolean {
    return o1 && o2 ? this.getSecurityFeatureIdentifier(o1) === this.getSecurityFeatureIdentifier(o2) : o1 === o2;
  }

  addSecurityFeatureToCollectionIfMissing<Type extends Pick<ISecurityFeature, 'id'>>(
    securityFeatureCollection: Type[],
    ...securityFeaturesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const securityFeatures: Type[] = securityFeaturesToCheck.filter(isPresent);
    if (securityFeatures.length > 0) {
      const securityFeatureCollectionIdentifiers = securityFeatureCollection.map(securityFeatureItem =>
        this.getSecurityFeatureIdentifier(securityFeatureItem),
      );
      const securityFeaturesToAdd = securityFeatures.filter(securityFeatureItem => {
        const securityFeatureIdentifier = this.getSecurityFeatureIdentifier(securityFeatureItem);
        if (securityFeatureCollectionIdentifiers.includes(securityFeatureIdentifier)) {
          return false;
        }
        securityFeatureCollectionIdentifiers.push(securityFeatureIdentifier);
        return true;
      });
      return [...securityFeaturesToAdd, ...securityFeatureCollection];
    }
    return securityFeatureCollection;
  }
}
