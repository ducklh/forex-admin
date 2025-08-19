import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import LanguageSupportResolve from './route/language-support-routing-resolve.service';

const languageSupportRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/language-support.component').then(m => m.LanguageSupportComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/language-support-detail.component').then(m => m.LanguageSupportDetailComponent),
    resolve: {
      languageSupport: LanguageSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/language-support-update.component').then(m => m.LanguageSupportUpdateComponent),
    resolve: {
      languageSupport: LanguageSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/language-support-update.component').then(m => m.LanguageSupportUpdateComponent),
    resolve: {
      languageSupport: LanguageSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default languageSupportRoute;
