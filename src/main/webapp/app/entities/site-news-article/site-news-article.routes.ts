import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import SiteNewsArticleResolve from './route/site-news-article-routing-resolve.service';

const siteNewsArticleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/site-news-article.component').then(m => m.SiteNewsArticleComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/site-news-article-detail.component').then(m => m.SiteNewsArticleDetailComponent),
    resolve: {
      siteNewsArticle: SiteNewsArticleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/site-news-article-update.component').then(m => m.SiteNewsArticleUpdateComponent),
    resolve: {
      siteNewsArticle: SiteNewsArticleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/site-news-article-update.component').then(m => m.SiteNewsArticleUpdateComponent),
    resolve: {
      siteNewsArticle: SiteNewsArticleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default siteNewsArticleRoute;
