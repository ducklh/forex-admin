import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPro, NewPro } from '../pro.model';

export type PartialUpdatePro = Partial<IPro> & Pick<IPro, 'id'>;

export type EntityResponseType = HttpResponse<IPro>;
export type EntityArrayResponseType = HttpResponse<IPro[]>;

@Injectable({ providedIn: 'root' })
export class ProService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pros');

  create(pro: NewPro): Observable<EntityResponseType> {
    return this.http.post<IPro>(this.resourceUrl, pro, { observe: 'response' });
  }

  update(pro: IPro): Observable<EntityResponseType> {
    return this.http.put<IPro>(`${this.resourceUrl}/${this.getProIdentifier(pro)}`, pro, { observe: 'response' });
  }

  partialUpdate(pro: PartialUpdatePro): Observable<EntityResponseType> {
    return this.http.patch<IPro>(`${this.resourceUrl}/${this.getProIdentifier(pro)}`, pro, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProIdentifier(pro: Pick<IPro, 'id'>): string {
    return pro.id;
  }

  comparePro(o1: Pick<IPro, 'id'> | null, o2: Pick<IPro, 'id'> | null): boolean {
    return o1 && o2 ? this.getProIdentifier(o1) === this.getProIdentifier(o2) : o1 === o2;
  }

  addProToCollectionIfMissing<Type extends Pick<IPro, 'id'>>(proCollection: Type[], ...prosToCheck: (Type | null | undefined)[]): Type[] {
    const pros: Type[] = prosToCheck.filter(isPresent);
    if (pros.length > 0) {
      const proCollectionIdentifiers = proCollection.map(proItem => this.getProIdentifier(proItem));
      const prosToAdd = pros.filter(proItem => {
        const proIdentifier = this.getProIdentifier(proItem);
        if (proCollectionIdentifiers.includes(proIdentifier)) {
          return false;
        }
        proCollectionIdentifiers.push(proIdentifier);
        return true;
      });
      return [...prosToAdd, ...proCollection];
    }
    return proCollection;
  }
}
