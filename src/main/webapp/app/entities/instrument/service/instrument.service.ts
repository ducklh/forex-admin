import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInstrument, NewInstrument } from '../instrument.model';

export type PartialUpdateInstrument = Partial<IInstrument> & Pick<IInstrument, 'id'>;

export type EntityResponseType = HttpResponse<IInstrument>;
export type EntityArrayResponseType = HttpResponse<IInstrument[]>;

@Injectable({ providedIn: 'root' })
export class InstrumentService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/instruments');

  create(instrument: NewInstrument): Observable<EntityResponseType> {
    return this.http.post<IInstrument>(this.resourceUrl, instrument, { observe: 'response' });
  }

  update(instrument: IInstrument): Observable<EntityResponseType> {
    return this.http.put<IInstrument>(`${this.resourceUrl}/${this.getInstrumentIdentifier(instrument)}`, instrument, {
      observe: 'response',
    });
  }

  partialUpdate(instrument: PartialUpdateInstrument): Observable<EntityResponseType> {
    return this.http.patch<IInstrument>(`${this.resourceUrl}/${this.getInstrumentIdentifier(instrument)}`, instrument, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IInstrument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstrument[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInstrumentIdentifier(instrument: Pick<IInstrument, 'id'>): string {
    return instrument.id;
  }

  compareInstrument(o1: Pick<IInstrument, 'id'> | null, o2: Pick<IInstrument, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstrumentIdentifier(o1) === this.getInstrumentIdentifier(o2) : o1 === o2;
  }

  addInstrumentToCollectionIfMissing<Type extends Pick<IInstrument, 'id'>>(
    instrumentCollection: Type[],
    ...instrumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const instruments: Type[] = instrumentsToCheck.filter(isPresent);
    if (instruments.length > 0) {
      const instrumentCollectionIdentifiers = instrumentCollection.map(instrumentItem => this.getInstrumentIdentifier(instrumentItem));
      const instrumentsToAdd = instruments.filter(instrumentItem => {
        const instrumentIdentifier = this.getInstrumentIdentifier(instrumentItem);
        if (instrumentCollectionIdentifiers.includes(instrumentIdentifier)) {
          return false;
        }
        instrumentCollectionIdentifiers.push(instrumentIdentifier);
        return true;
      });
      return [...instrumentsToAdd, ...instrumentCollection];
    }
    return instrumentCollection;
  }
}
