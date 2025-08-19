import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomerSupport } from '../customer-support.model';
import { CustomerSupportService } from '../service/customer-support.service';

const customerSupportResolve = (route: ActivatedRouteSnapshot): Observable<null | ICustomerSupport> => {
  const id = route.params.id;
  if (id) {
    return inject(CustomerSupportService)
      .find(id)
      .pipe(
        mergeMap((customerSupport: HttpResponse<ICustomerSupport>) => {
          if (customerSupport.body) {
            return of(customerSupport.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default customerSupportResolve;
