import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustomerSupport, NewCustomerSupport } from '../customer-support.model';

export type PartialUpdateCustomerSupport = Partial<ICustomerSupport> & Pick<ICustomerSupport, 'id'>;

export type EntityResponseType = HttpResponse<ICustomerSupport>;
export type EntityArrayResponseType = HttpResponse<ICustomerSupport[]>;

@Injectable({ providedIn: 'root' })
export class CustomerSupportService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/customer-supports');

  create(customerSupport: NewCustomerSupport): Observable<EntityResponseType> {
    return this.http.post<ICustomerSupport>(this.resourceUrl, customerSupport, { observe: 'response' });
  }

  update(customerSupport: ICustomerSupport): Observable<EntityResponseType> {
    return this.http.put<ICustomerSupport>(`${this.resourceUrl}/${this.getCustomerSupportIdentifier(customerSupport)}`, customerSupport, {
      observe: 'response',
    });
  }

  partialUpdate(customerSupport: PartialUpdateCustomerSupport): Observable<EntityResponseType> {
    return this.http.patch<ICustomerSupport>(`${this.resourceUrl}/${this.getCustomerSupportIdentifier(customerSupport)}`, customerSupport, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICustomerSupport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerSupport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCustomerSupportIdentifier(customerSupport: Pick<ICustomerSupport, 'id'>): string {
    return customerSupport.id;
  }

  compareCustomerSupport(o1: Pick<ICustomerSupport, 'id'> | null, o2: Pick<ICustomerSupport, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomerSupportIdentifier(o1) === this.getCustomerSupportIdentifier(o2) : o1 === o2;
  }

  addCustomerSupportToCollectionIfMissing<Type extends Pick<ICustomerSupport, 'id'>>(
    customerSupportCollection: Type[],
    ...customerSupportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customerSupports: Type[] = customerSupportsToCheck.filter(isPresent);
    if (customerSupports.length > 0) {
      const customerSupportCollectionIdentifiers = customerSupportCollection.map(customerSupportItem =>
        this.getCustomerSupportIdentifier(customerSupportItem),
      );
      const customerSupportsToAdd = customerSupports.filter(customerSupportItem => {
        const customerSupportIdentifier = this.getCustomerSupportIdentifier(customerSupportItem);
        if (customerSupportCollectionIdentifiers.includes(customerSupportIdentifier)) {
          return false;
        }
        customerSupportCollectionIdentifiers.push(customerSupportIdentifier);
        return true;
      });
      return [...customerSupportsToAdd, ...customerSupportCollection];
    }
    return customerSupportCollection;
  }
}
