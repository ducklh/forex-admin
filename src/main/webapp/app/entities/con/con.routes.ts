import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import ConResolve from './route/con-routing-resolve.service';

const conRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/con.component').then(m => m.ConComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/con-detail.component').then(m => m.ConDetailComponent),
    resolve: {
      con: ConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/con-update.component').then(m => m.ConUpdateComponent),
    resolve: {
      con: ConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/con-update.component').then(m => m.ConUpdateComponent),
    resolve: {
      con: ConResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default conRoute;
