import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBroker } from '../broker.model';
import { BrokerService } from '../service/broker.service';

const brokerResolve = (route: ActivatedRouteSnapshot): Observable<null | IBroker> => {
  const id = route.params.id;
  if (id) {
    return inject(BrokerService)
      .find(id)
      .pipe(
        mergeMap((broker: HttpResponse<IBroker>) => {
          if (broker.body) {
            return of(broker.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default brokerResolve;
