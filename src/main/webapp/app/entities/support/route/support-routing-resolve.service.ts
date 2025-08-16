import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISupport } from '../support.model';
import { SupportService } from '../service/support.service';

const supportResolve = (route: ActivatedRouteSnapshot): Observable<null | ISupport> => {
  const id = route.params.id;
  if (id) {
    return inject(SupportService)
      .find(id)
      .pipe(
        mergeMap((support: HttpResponse<ISupport>) => {
          if (support.body) {
            return of(support.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default supportResolve;
