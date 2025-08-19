import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKnowledgeTag } from '../knowledge-tag.model';
import { KnowledgeTagService } from '../service/knowledge-tag.service';

const knowledgeTagResolve = (route: ActivatedRouteSnapshot): Observable<null | IKnowledgeTag> => {
  const id = route.params.id;
  if (id) {
    return inject(KnowledgeTagService)
      .find(id)
      .pipe(
        mergeMap((knowledgeTag: HttpResponse<IKnowledgeTag>) => {
          if (knowledgeTag.body) {
            return of(knowledgeTag.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default knowledgeTagResolve;
