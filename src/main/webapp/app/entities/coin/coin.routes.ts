import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CoinResolve from './route/coin-routing-resolve.service';

const coinRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/coin.component').then(m => m.CoinComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/coin-detail.component').then(m => m.CoinDetailComponent),
    resolve: {
      coin: CoinResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/coin-update.component').then(m => m.CoinUpdateComponent),
    resolve: {
      coin: CoinResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/coin-update.component').then(m => m.CoinUpdateComponent),
    resolve: {
      coin: CoinResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default coinRoute;
