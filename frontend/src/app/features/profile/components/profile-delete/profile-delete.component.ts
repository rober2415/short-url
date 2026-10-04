import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss'],
})
export class ProfileDeleteComponent {
  @Output() deletedProfile: EventEmitter<void> = new EventEmitter<void>();

  deleteUserProfile(): void {
    this.deletedProfile.emit();
  }
}
