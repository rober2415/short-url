import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss'],
})
export class ProfileDeleteComponent {
  @Output() deleteProfile: EventEmitter<void> = new EventEmitter<void>();

  deleteUserProfile(): void {
    this.deleteProfile.emit();
  }
}
