import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import InstrumentResolve from './route/instrument-routing-resolve.service';

const instrumentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/instrument.component').then(m => m.InstrumentComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/instrument-detail.component').then(m => m.InstrumentDetailComponent),
    resolve: {
      instrument: InstrumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/instrument-update.component').then(m => m.InstrumentUpdateComponent),
    resolve: {
      instrument: InstrumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/instrument-update.component').then(m => m.InstrumentUpdateComponent),
    resolve: {
      instrument: InstrumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default instrumentRoute;
