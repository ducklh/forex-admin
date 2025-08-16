import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILanguage } from '../language.model';
import { LanguageService } from '../service/language.service';

const languageResolve = (route: ActivatedRouteSnapshot): Observable<null | ILanguage> => {
  const id = route.params.id;
  if (id) {
    return inject(LanguageService)
      .find(id)
      .pipe(
        mergeMap((language: HttpResponse<ILanguage>) => {
          if (language.body) {
            return of(language.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default languageResolve;
