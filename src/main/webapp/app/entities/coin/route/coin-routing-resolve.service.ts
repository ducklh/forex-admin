import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICoin } from '../coin.model';
import { CoinService } from '../service/coin.service';

const coinResolve = (route: ActivatedRouteSnapshot): Observable<null | ICoin> => {
  const id = route.params.id;
  if (id) {
    return inject(CoinService)
      .find(id)
      .pipe(
        mergeMap((coin: HttpResponse<ICoin>) => {
          if (coin.body) {
            return of(coin.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default coinResolve;
