import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlatform, NewPlatform } from '../platform.model';

export type PartialUpdatePlatform = Partial<IPlatform> & Pick<IPlatform, 'id'>;

export type EntityResponseType = HttpResponse<IPlatform>;
export type EntityArrayResponseType = HttpResponse<IPlatform[]>;

@Injectable({ providedIn: 'root' })
export class PlatformService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/platforms');

  create(platform: NewPlatform): Observable<EntityResponseType> {
    return this.http.post<IPlatform>(this.resourceUrl, platform, { observe: 'response' });
  }

  update(platform: IPlatform): Observable<EntityResponseType> {
    return this.http.put<IPlatform>(`${this.resourceUrl}/${this.getPlatformIdentifier(platform)}`, platform, { observe: 'response' });
  }

  partialUpdate(platform: PartialUpdatePlatform): Observable<EntityResponseType> {
    return this.http.patch<IPlatform>(`${this.resourceUrl}/${this.getPlatformIdentifier(platform)}`, platform, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPlatform>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlatform[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlatformIdentifier(platform: Pick<IPlatform, 'id'>): string {
    return platform.id;
  }

  comparePlatform(o1: Pick<IPlatform, 'id'> | null, o2: Pick<IPlatform, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlatformIdentifier(o1) === this.getPlatformIdentifier(o2) : o1 === o2;
  }

  addPlatformToCollectionIfMissing<Type extends Pick<IPlatform, 'id'>>(
    platformCollection: Type[],
    ...platformsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const platforms: Type[] = platformsToCheck.filter(isPresent);
    if (platforms.length > 0) {
      const platformCollectionIdentifiers = platformCollection.map(platformItem => this.getPlatformIdentifier(platformItem));
      const platformsToAdd = platforms.filter(platformItem => {
        const platformIdentifier = this.getPlatformIdentifier(platformItem);
        if (platformCollectionIdentifiers.includes(platformIdentifier)) {
          return false;
        }
        platformCollectionIdentifiers.push(platformIdentifier);
        return true;
      });
      return [...platformsToAdd, ...platformCollection];
    }
    return platformCollection;
  }
}
