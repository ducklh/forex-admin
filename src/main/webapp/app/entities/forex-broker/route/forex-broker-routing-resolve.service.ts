import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IForexBroker } from '../forex-broker.model';
import { ForexBrokerService } from '../service/forex-broker.service';

const forexBrokerResolve = (route: ActivatedRouteSnapshot): Observable<null | IForexBroker> => {
  const id = route.params.id;
  if (id) {
    return inject(ForexBrokerService)
      .find(id)
      .pipe(
        mergeMap((forexBroker: HttpResponse<IForexBroker>) => {
          if (forexBroker.body) {
            return of(forexBroker.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default forexBrokerResolve;
