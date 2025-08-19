import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CryptoProResolve from './route/crypto-pro-routing-resolve.service';

const cryptoProRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/crypto-pro.component').then(m => m.CryptoProComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/crypto-pro-detail.component').then(m => m.CryptoProDetailComponent),
    resolve: {
      cryptoPro: CryptoProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/crypto-pro-update.component').then(m => m.CryptoProUpdateComponent),
    resolve: {
      cryptoPro: CryptoProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/crypto-pro-update.component').then(m => m.CryptoProUpdateComponent),
    resolve: {
      cryptoPro: CryptoProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cryptoProRoute;
