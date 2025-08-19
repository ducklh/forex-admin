jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CryptoPaymentMethodService } from '../service/crypto-payment-method.service';

import { CryptoPaymentMethodDeleteDialogComponent } from './crypto-payment-method-delete-dialog.component';

describe('CryptoPaymentMethod Management Delete Component', () => {
  let comp: CryptoPaymentMethodDeleteDialogComponent;
  let fixture: ComponentFixture<CryptoPaymentMethodDeleteDialogComponent>;
  let service: CryptoPaymentMethodService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoPaymentMethodDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(CryptoPaymentMethodDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CryptoPaymentMethodDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CryptoPaymentMethodService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete('ABC');
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith('ABC');
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
