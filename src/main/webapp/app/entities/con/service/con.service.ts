import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICon, NewCon } from '../con.model';

export type PartialUpdateCon = Partial<ICon> & Pick<ICon, 'id'>;

export type EntityResponseType = HttpResponse<ICon>;
export type EntityArrayResponseType = HttpResponse<ICon[]>;

@Injectable({ providedIn: 'root' })
export class ConService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cons');

  create(con: NewCon): Observable<EntityResponseType> {
    return this.http.post<ICon>(this.resourceUrl, con, { observe: 'response' });
  }

  update(con: ICon): Observable<EntityResponseType> {
    return this.http.put<ICon>(`${this.resourceUrl}/${this.getConIdentifier(con)}`, con, { observe: 'response' });
  }

  partialUpdate(con: PartialUpdateCon): Observable<EntityResponseType> {
    return this.http.patch<ICon>(`${this.resourceUrl}/${this.getConIdentifier(con)}`, con, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConIdentifier(con: Pick<ICon, 'id'>): string {
    return con.id;
  }

  compareCon(o1: Pick<ICon, 'id'> | null, o2: Pick<ICon, 'id'> | null): boolean {
    return o1 && o2 ? this.getConIdentifier(o1) === this.getConIdentifier(o2) : o1 === o2;
  }

  addConToCollectionIfMissing<Type extends Pick<ICon, 'id'>>(conCollection: Type[], ...consToCheck: (Type | null | undefined)[]): Type[] {
    const cons: Type[] = consToCheck.filter(isPresent);
    if (cons.length > 0) {
      const conCollectionIdentifiers = conCollection.map(conItem => this.getConIdentifier(conItem));
      const consToAdd = cons.filter(conItem => {
        const conIdentifier = this.getConIdentifier(conItem);
        if (conCollectionIdentifiers.includes(conIdentifier)) {
          return false;
        }
        conCollectionIdentifiers.push(conIdentifier);
        return true;
      });
      return [...consToAdd, ...conCollection];
    }
    return conCollection;
  }
}
