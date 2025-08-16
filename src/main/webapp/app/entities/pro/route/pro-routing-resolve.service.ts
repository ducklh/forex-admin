import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPro } from '../pro.model';
import { ProService } from '../service/pro.service';

const proResolve = (route: ActivatedRouteSnapshot): Observable<null | IPro> => {
  const id = route.params.id;
  if (id) {
    return inject(ProService)
      .find(id)
      .pipe(
        mergeMap((pro: HttpResponse<IPro>) => {
          if (pro.body) {
            return of(pro.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default proResolve;
