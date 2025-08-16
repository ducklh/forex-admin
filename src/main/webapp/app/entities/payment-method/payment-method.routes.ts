import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import PaymentMethodResolve from './route/payment-method-routing-resolve.service';

const paymentMethodRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/payment-method.component').then(m => m.PaymentMethodComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/payment-method-detail.component').then(m => m.PaymentMethodDetailComponent),
    resolve: {
      paymentMethod: PaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/payment-method-update.component').then(m => m.PaymentMethodUpdateComponent),
    resolve: {
      paymentMethod: PaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/payment-method-update.component').then(m => m.PaymentMethodUpdateComponent),
    resolve: {
      paymentMethod: PaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default paymentMethodRoute;
