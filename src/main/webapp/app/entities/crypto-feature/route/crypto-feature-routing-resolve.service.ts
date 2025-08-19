import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICryptoFeature } from '../crypto-feature.model';
import { CryptoFeatureService } from '../service/crypto-feature.service';

const cryptoFeatureResolve = (route: ActivatedRouteSnapshot): Observable<null | ICryptoFeature> => {
  const id = route.params.id;
  if (id) {
    return inject(CryptoFeatureService)
      .find(id)
      .pipe(
        mergeMap((cryptoFeature: HttpResponse<ICryptoFeature>) => {
          if (cryptoFeature.body) {
            return of(cryptoFeature.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cryptoFeatureResolve;
