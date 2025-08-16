import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import PlatformResolve from './route/platform-routing-resolve.service';

const platformRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/platform.component').then(m => m.PlatformComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/platform-detail.component').then(m => m.PlatformDetailComponent),
    resolve: {
      platform: PlatformResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/platform-update.component').then(m => m.PlatformUpdateComponent),
    resolve: {
      platform: PlatformResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/platform-update.component').then(m => m.PlatformUpdateComponent),
    resolve: {
      platform: PlatformResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default platformRoute;
