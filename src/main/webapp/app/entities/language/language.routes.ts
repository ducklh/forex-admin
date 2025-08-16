import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import LanguageResolve from './route/language-routing-resolve.service';

const languageRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/language.component').then(m => m.LanguageComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/language-detail.component').then(m => m.LanguageDetailComponent),
    resolve: {
      language: LanguageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/language-update.component').then(m => m.LanguageUpdateComponent),
    resolve: {
      language: LanguageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/language-update.component').then(m => m.LanguageUpdateComponent),
    resolve: {
      language: LanguageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default languageRoute;
