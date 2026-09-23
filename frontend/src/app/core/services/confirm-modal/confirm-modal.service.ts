import { Injectable } from '@angular/core';
import { ConfirmModal } from '../../models/confirm-modal.interface';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  constructor(private modalService: NgbModal) {}

  confirm(options: ConfirmModal): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: true,
      keyboard: true,
    });

    modalRef.componentInstance.options = options;

    return from(modalRef.result).pipe(
      map((result) => result === true),
      catchError(() => of(false)),
    );
  }
}
