import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import SupportResolve from './route/support-routing-resolve.service';

const supportRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/support.component').then(m => m.SupportComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/support-detail.component').then(m => m.SupportDetailComponent),
    resolve: {
      support: SupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/support-update.component').then(m => m.SupportUpdateComponent),
    resolve: {
      support: SupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/support-update.component').then(m => m.SupportUpdateComponent),
    resolve: {
      support: SupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default supportRoute;
