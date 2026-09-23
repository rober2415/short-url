import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from 'src/app/core/models/confirm-modal.interface';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() options: ConfirmModal = {};

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm(): void {
    this.activeModal.close(true);
  }
}
