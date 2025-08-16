import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICryptoBroker } from '../crypto-broker.model';
import { CryptoBrokerService } from '../service/crypto-broker.service';

const cryptoBrokerResolve = (route: ActivatedRouteSnapshot): Observable<null | ICryptoBroker> => {
  const id = route.params.id;
  if (id) {
    return inject(CryptoBrokerService)
      .find(id)
      .pipe(
        mergeMap((cryptoBroker: HttpResponse<ICryptoBroker>) => {
          if (cryptoBroker.body) {
            return of(cryptoBroker.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cryptoBrokerResolve;
