import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICon } from '../con.model';
import { ConService } from '../service/con.service';

const conResolve = (route: ActivatedRouteSnapshot): Observable<null | ICon> => {
  const id = route.params.id;
  if (id) {
    return inject(ConService)
      .find(id)
      .pipe(
        mergeMap((con: HttpResponse<ICon>) => {
          if (con.body) {
            return of(con.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default conResolve;
