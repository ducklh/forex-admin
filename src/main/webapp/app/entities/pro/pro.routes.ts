import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import ProResolve from './route/pro-routing-resolve.service';

const proRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/pro.component').then(m => m.ProComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/pro-detail.component').then(m => m.ProDetailComponent),
    resolve: {
      pro: ProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/pro-update.component').then(m => m.ProUpdateComponent),
    resolve: {
      pro: ProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/pro-update.component').then(m => m.ProUpdateComponent),
    resolve: {
      pro: ProResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default proRoute;
