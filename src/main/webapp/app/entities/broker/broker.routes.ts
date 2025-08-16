import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import BrokerResolve from './route/broker-routing-resolve.service';

const brokerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/broker.component').then(m => m.BrokerComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/broker-detail.component').then(m => m.BrokerDetailComponent),
    resolve: {
      broker: BrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/broker-update.component').then(m => m.BrokerUpdateComponent),
    resolve: {
      broker: BrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/broker-update.component').then(m => m.BrokerUpdateComponent),
    resolve: {
      broker: BrokerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default brokerRoute;
