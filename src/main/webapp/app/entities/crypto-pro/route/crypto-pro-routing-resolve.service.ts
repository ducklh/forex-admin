import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICryptoPro } from '../crypto-pro.model';
import { CryptoProService } from '../service/crypto-pro.service';

const cryptoProResolve = (route: ActivatedRouteSnapshot): Observable<null | ICryptoPro> => {
  const id = route.params.id;
  if (id) {
    return inject(CryptoProService)
      .find(id)
      .pipe(
        mergeMap((cryptoPro: HttpResponse<ICryptoPro>) => {
          if (cryptoPro.body) {
            return of(cryptoPro.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cryptoProResolve;
