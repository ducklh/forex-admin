import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICryptoPaymentMethod } from '../crypto-payment-method.model';
import { CryptoPaymentMethodService } from '../service/crypto-payment-method.service';

const cryptoPaymentMethodResolve = (route: ActivatedRouteSnapshot): Observable<null | ICryptoPaymentMethod> => {
  const id = route.params.id;
  if (id) {
    return inject(CryptoPaymentMethodService)
      .find(id)
      .pipe(
        mergeMap((cryptoPaymentMethod: HttpResponse<ICryptoPaymentMethod>) => {
          if (cryptoPaymentMethod.body) {
            return of(cryptoPaymentMethod.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cryptoPaymentMethodResolve;
