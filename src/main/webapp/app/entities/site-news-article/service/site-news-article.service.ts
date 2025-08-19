import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISiteNewsArticle, NewSiteNewsArticle } from '../site-news-article.model';

export type PartialUpdateSiteNewsArticle = Partial<ISiteNewsArticle> & Pick<ISiteNewsArticle, 'id'>;

type RestOf<T extends ISiteNewsArticle | NewSiteNewsArticle> = Omit<T, 'publishedAt'> & {
  publishedAt?: string | null;
};

export type RestSiteNewsArticle = RestOf<ISiteNewsArticle>;

export type NewRestSiteNewsArticle = RestOf<NewSiteNewsArticle>;

export type PartialUpdateRestSiteNewsArticle = RestOf<PartialUpdateSiteNewsArticle>;

export type EntityResponseType = HttpResponse<ISiteNewsArticle>;
export type EntityArrayResponseType = HttpResponse<ISiteNewsArticle[]>;

@Injectable({ providedIn: 'root' })
export class SiteNewsArticleService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/site-news-articles');

  create(siteNewsArticle: NewSiteNewsArticle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(siteNewsArticle);
    return this.http
      .post<RestSiteNewsArticle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(siteNewsArticle: ISiteNewsArticle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(siteNewsArticle);
    return this.http
      .put<RestSiteNewsArticle>(`${this.resourceUrl}/${this.getSiteNewsArticleIdentifier(siteNewsArticle)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(siteNewsArticle: PartialUpdateSiteNewsArticle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(siteNewsArticle);
    return this.http
      .patch<RestSiteNewsArticle>(`${this.resourceUrl}/${this.getSiteNewsArticleIdentifier(siteNewsArticle)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestSiteNewsArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSiteNewsArticle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSiteNewsArticleIdentifier(siteNewsArticle: Pick<ISiteNewsArticle, 'id'>): string {
    return siteNewsArticle.id;
  }

  compareSiteNewsArticle(o1: Pick<ISiteNewsArticle, 'id'> | null, o2: Pick<ISiteNewsArticle, 'id'> | null): boolean {
    return o1 && o2 ? this.getSiteNewsArticleIdentifier(o1) === this.getSiteNewsArticleIdentifier(o2) : o1 === o2;
  }

  addSiteNewsArticleToCollectionIfMissing<Type extends Pick<ISiteNewsArticle, 'id'>>(
    siteNewsArticleCollection: Type[],
    ...siteNewsArticlesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const siteNewsArticles: Type[] = siteNewsArticlesToCheck.filter(isPresent);
    if (siteNewsArticles.length > 0) {
      const siteNewsArticleCollectionIdentifiers = siteNewsArticleCollection.map(siteNewsArticleItem =>
        this.getSiteNewsArticleIdentifier(siteNewsArticleItem),
      );
      const siteNewsArticlesToAdd = siteNewsArticles.filter(siteNewsArticleItem => {
        const siteNewsArticleIdentifier = this.getSiteNewsArticleIdentifier(siteNewsArticleItem);
        if (siteNewsArticleCollectionIdentifiers.includes(siteNewsArticleIdentifier)) {
          return false;
        }
        siteNewsArticleCollectionIdentifiers.push(siteNewsArticleIdentifier);
        return true;
      });
      return [...siteNewsArticlesToAdd, ...siteNewsArticleCollection];
    }
    return siteNewsArticleCollection;
  }

  protected convertDateFromClient<T extends ISiteNewsArticle | NewSiteNewsArticle | PartialUpdateSiteNewsArticle>(
    siteNewsArticle: T,
  ): RestOf<T> {
    return {
      ...siteNewsArticle,
      publishedAt: siteNewsArticle.publishedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSiteNewsArticle: RestSiteNewsArticle): ISiteNewsArticle {
    return {
      ...restSiteNewsArticle,
      publishedAt: restSiteNewsArticle.publishedAt ? dayjs(restSiteNewsArticle.publishedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSiteNewsArticle>): HttpResponse<ISiteNewsArticle> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSiteNewsArticle[]>): HttpResponse<ISiteNewsArticle[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
