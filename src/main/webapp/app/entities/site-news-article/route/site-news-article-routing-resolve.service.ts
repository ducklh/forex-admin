import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISiteNewsArticle } from '../site-news-article.model';
import { SiteNewsArticleService } from '../service/site-news-article.service';

const siteNewsArticleResolve = (route: ActivatedRouteSnapshot): Observable<null | ISiteNewsArticle> => {
  const id = route.params.id;
  if (id) {
    return inject(SiteNewsArticleService)
      .find(id)
      .pipe(
        mergeMap((siteNewsArticle: HttpResponse<ISiteNewsArticle>) => {
          if (siteNewsArticle.body) {
            return of(siteNewsArticle.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default siteNewsArticleResolve;
