import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILanguageSupport, NewLanguageSupport } from '../language-support.model';

export type PartialUpdateLanguageSupport = Partial<ILanguageSupport> & Pick<ILanguageSupport, 'id'>;

export type EntityResponseType = HttpResponse<ILanguageSupport>;
export type EntityArrayResponseType = HttpResponse<ILanguageSupport[]>;

@Injectable({ providedIn: 'root' })
export class LanguageSupportService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/language-supports');

  create(languageSupport: NewLanguageSupport): Observable<EntityResponseType> {
    return this.http.post<ILanguageSupport>(this.resourceUrl, languageSupport, { observe: 'response' });
  }

  update(languageSupport: ILanguageSupport): Observable<EntityResponseType> {
    return this.http.put<ILanguageSupport>(`${this.resourceUrl}/${this.getLanguageSupportIdentifier(languageSupport)}`, languageSupport, {
      observe: 'response',
    });
  }

  partialUpdate(languageSupport: PartialUpdateLanguageSupport): Observable<EntityResponseType> {
    return this.http.patch<ILanguageSupport>(`${this.resourceUrl}/${this.getLanguageSupportIdentifier(languageSupport)}`, languageSupport, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILanguageSupport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILanguageSupport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLanguageSupportIdentifier(languageSupport: Pick<ILanguageSupport, 'id'>): string {
    return languageSupport.id;
  }

  compareLanguageSupport(o1: Pick<ILanguageSupport, 'id'> | null, o2: Pick<ILanguageSupport, 'id'> | null): boolean {
    return o1 && o2 ? this.getLanguageSupportIdentifier(o1) === this.getLanguageSupportIdentifier(o2) : o1 === o2;
  }

  addLanguageSupportToCollectionIfMissing<Type extends Pick<ILanguageSupport, 'id'>>(
    languageSupportCollection: Type[],
    ...languageSupportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const languageSupports: Type[] = languageSupportsToCheck.filter(isPresent);
    if (languageSupports.length > 0) {
      const languageSupportCollectionIdentifiers = languageSupportCollection.map(languageSupportItem =>
        this.getLanguageSupportIdentifier(languageSupportItem),
      );
      const languageSupportsToAdd = languageSupports.filter(languageSupportItem => {
        const languageSupportIdentifier = this.getLanguageSupportIdentifier(languageSupportItem);
        if (languageSupportCollectionIdentifiers.includes(languageSupportIdentifier)) {
          return false;
        }
        languageSupportCollectionIdentifiers.push(languageSupportIdentifier);
        return true;
      });
      return [...languageSupportsToAdd, ...languageSupportCollection];
    }
    return languageSupportCollection;
  }
}
