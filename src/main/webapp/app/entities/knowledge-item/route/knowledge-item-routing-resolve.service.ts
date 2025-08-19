import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKnowledgeItem } from '../knowledge-item.model';
import { KnowledgeItemService } from '../service/knowledge-item.service';

const knowledgeItemResolve = (route: ActivatedRouteSnapshot): Observable<null | IKnowledgeItem> => {
  const id = route.params.id;
  if (id) {
    return inject(KnowledgeItemService)
      .find(id)
      .pipe(
        mergeMap((knowledgeItem: HttpResponse<IKnowledgeItem>) => {
          if (knowledgeItem.body) {
            return of(knowledgeItem.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default knowledgeItemResolve;
