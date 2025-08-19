import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CustomerSupportResolve from './route/customer-support-routing-resolve.service';

const customerSupportRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/customer-support.component').then(m => m.CustomerSupportComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/customer-support-detail.component').then(m => m.CustomerSupportDetailComponent),
    resolve: {
      customerSupport: CustomerSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/customer-support-update.component').then(m => m.CustomerSupportUpdateComponent),
    resolve: {
      customerSupport: CustomerSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/customer-support-update.component').then(m => m.CustomerSupportUpdateComponent),
    resolve: {
      customerSupport: CustomerSupportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default customerSupportRoute;
