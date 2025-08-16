import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegulation } from '../regulation.model';
import { RegulationService } from '../service/regulation.service';

const regulationResolve = (route: ActivatedRouteSnapshot): Observable<null | IRegulation> => {
  const id = route.params.id;
  if (id) {
    return inject(RegulationService)
      .find(id)
      .pipe(
        mergeMap((regulation: HttpResponse<IRegulation>) => {
          if (regulation.body) {
            return of(regulation.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default regulationResolve;
