import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  @Input() profile: Profile | null = null;
  @Output() updateProfile = new EventEmitter<Profile>();

  onSubmit(): void {
    if (this.profile) {
      this.updateProfile.emit(this.profile);
    }
  }
}
