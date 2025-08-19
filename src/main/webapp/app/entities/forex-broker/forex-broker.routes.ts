import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import ForexBrokerResolve from './route/forex-broker-routing-resolve.service';

const forexBrokerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/forex-broker.component').then(m => m.ForexBrokerComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/forex-broker-detail.component').then(m => m.ForexBrokerDetailComponent),
    resolve: {
      forexBroker: ForexBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/forex-broker-update.component').then(m => m.ForexBrokerUpdateComponent),
    resolve: {
      forexBroker: ForexBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/forex-broker-update.component').then(m => m.ForexBrokerUpdateComponent),
    resolve: {
      forexBroker: ForexBrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default forexBrokerRoute;
