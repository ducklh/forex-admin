import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CryptoBrokerResolve from './route/crypto-broker-routing-resolve.service';

const cryptoBrokerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/crypto-broker.component').then(m => m.CryptoBrokerComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/crypto-broker-detail.component').then(m => m.CryptoBrokerDetailComponent),
    resolve: {
      cryptoBroker: CryptoBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/crypto-broker-update.component').then(m => m.CryptoBrokerUpdateComponent),
    resolve: {
      cryptoBroker: CryptoBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/crypto-broker-update.component').then(m => m.CryptoBrokerUpdateComponent),
    resolve: {
      cryptoBroker: CryptoBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cryptoBrokerRoute;
