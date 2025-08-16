import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import RegulationResolve from './route/regulation-routing-resolve.service';

const regulationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/regulation.component').then(m => m.RegulationComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/regulation-detail.component').then(m => m.RegulationDetailComponent),
    resolve: {
      regulation: RegulationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/regulation-update.component').then(m => m.RegulationUpdateComponent),
    resolve: {
      regulation: RegulationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/regulation-update.component').then(m => m.RegulationUpdateComponent),
    resolve: {
      regulation: RegulationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default regulationRoute;
