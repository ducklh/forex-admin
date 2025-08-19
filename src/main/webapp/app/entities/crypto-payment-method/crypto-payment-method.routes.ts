import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import CryptoPaymentMethodResolve from './route/crypto-payment-method-routing-resolve.service';

const cryptoPaymentMethodRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/crypto-payment-method.component').then(m => m.CryptoPaymentMethodComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/crypto-payment-method-detail.component').then(m => m.CryptoPaymentMethodDetailComponent),
    resolve: {
      cryptoPaymentMethod: CryptoPaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/crypto-payment-method-update.component').then(m => m.CryptoPaymentMethodUpdateComponent),
    resolve: {
      cryptoPaymentMethod: CryptoPaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/crypto-payment-method-update.component').then(m => m.CryptoPaymentMethodUpdateComponent),
    resolve: {
      cryptoPaymentMethod: CryptoPaymentMethodResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cryptoPaymentMethodRoute;
