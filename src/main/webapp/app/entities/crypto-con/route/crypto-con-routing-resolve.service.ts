import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICryptoCon } from '../crypto-con.model';
import { CryptoConService } from '../service/crypto-con.service';

const cryptoConResolve = (route: ActivatedRouteSnapshot): Observable<null | ICryptoCon> => {
  const id = route.params.id;
  if (id) {
    return inject(CryptoConService)
      .find(id)
      .pipe(
        mergeMap((cryptoCon: HttpResponse<ICryptoCon>) => {
          if (cryptoCon.body) {
            return of(cryptoCon.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cryptoConResolve;
