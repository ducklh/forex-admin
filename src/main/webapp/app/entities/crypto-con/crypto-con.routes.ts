import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CryptoConResolve from './route/crypto-con-routing-resolve.service';

const cryptoConRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/crypto-con.component').then(m => m.CryptoConComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/crypto-con-detail.component').then(m => m.CryptoConDetailComponent),
    resolve: {
      cryptoCon: CryptoConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/crypto-con-update.component').then(m => m.CryptoConUpdateComponent),
    resolve: {
      cryptoCon: CryptoConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/crypto-con-update.component').then(m => m.CryptoConUpdateComponent),
    resolve: {
      cryptoCon: CryptoConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cryptoConRoute;
