import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CryptoFeatureResolve from './route/crypto-feature-routing-resolve.service';

const cryptoFeatureRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/crypto-feature.component').then(m => m.CryptoFeatureComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/crypto-feature-detail.component').then(m => m.CryptoFeatureDetailComponent),
    resolve: {
      cryptoFeature: CryptoFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/crypto-feature-update.component').then(m => m.CryptoFeatureUpdateComponent),
    resolve: {
      cryptoFeature: CryptoFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/crypto-feature-update.component').then(m => m.CryptoFeatureUpdateComponent),
    resolve: {
      cryptoFeature: CryptoFeatureResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cryptoFeatureRoute;
