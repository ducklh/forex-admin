import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILanguageSupport } from '../language-support.model';
import { LanguageSupportService } from '../service/language-support.service';

const languageSupportResolve = (route: ActivatedRouteSnapshot): Observable<null | ILanguageSupport> => {
  const id = route.params.id;
  if (id) {
    return inject(LanguageSupportService)
      .find(id)
      .pipe(
        mergeMap((languageSupport: HttpResponse<ILanguageSupport>) => {
          if (languageSupport.body) {
            return of(languageSupport.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default languageSupportResolve;
