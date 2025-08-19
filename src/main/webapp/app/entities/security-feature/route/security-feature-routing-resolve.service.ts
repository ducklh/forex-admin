import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecurityFeature } from '../security-feature.model';
import { SecurityFeatureService } from '../service/security-feature.service';

const securityFeatureResolve = (route: ActivatedRouteSnapshot): Observable<null | ISecurityFeature> => {
  const id = route.params.id;
  if (id) {
    return inject(SecurityFeatureService)
      .find(id)
      .pipe(
        mergeMap((securityFeature: HttpResponse<ISecurityFeature>) => {
          if (securityFeature.body) {
            return of(securityFeature.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default securityFeatureResolve;
