import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import SecurityFeatureResolve from './route/security-feature-routing-resolve.service';

const securityFeatureRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/security-feature.component').then(m => m.SecurityFeatureComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/security-feature-detail.component').then(m => m.SecurityFeatureDetailComponent),
    resolve: {
      securityFeature: SecurityFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/security-feature-update.component').then(m => m.SecurityFeatureUpdateComponent),
    resolve: {
      securityFeature: SecurityFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/security-feature-update.component').then(m => m.SecurityFeatureUpdateComponent),
    resolve: {
      securityFeature: SecurityFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default securityFeatureRoute;
