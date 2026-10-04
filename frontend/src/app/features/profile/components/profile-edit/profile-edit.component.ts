import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Profile, UpdatePasswordRequest, UpdateProfileRequest } from '../../models/profile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  @Input() profile: Profile | null = null;
  @Output() updatedProfile = new EventEmitter<UpdateProfileRequest>();
  @Output() updatedPassword = new EventEmitter<UpdatePasswordRequest>();

  profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  passwordForm: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      this.profileForm.patchValue({ name: this.profile.name });
    }
  }

  onSubmitProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.updatedProfile.emit(this.profileForm.value);
  }

  onSubmitPassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.updatedPassword.emit(this.passwordForm.value);
    this.passwordForm.reset();
  }
}
