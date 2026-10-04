import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile, UpdatePasswordRequest, UpdateProfileRequest } from '../../models/profile.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmModalService } from 'src/app/core/services/confirm-modal/confirm-modal.service';
import { filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profile$ = this.profileService.profile$;
  isLoading$ = this.profileService.isLoading$;

  constructor(
    private profileService: ProfileService,
    private confirmModalService: ConfirmModalService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      error: (error) => console.error('Error loading user profile', error),
    });
  }

  onUpdateProfile(profile: UpdateProfileRequest): void {
    this.profileService.updateUserProfile(profile).subscribe({
      next: () => this.toastService.success('Profile updated successfully.'),
      error: () => this.toastService.error('Error updating profile.'),
    });
  }

  onUpdatePassword(data: UpdatePasswordRequest): void {
    this.profileService.updateUserProfilePassword(data).subscribe({
      next: () => this.toastService.success('Password updated successfully.'),
      error: () => this.toastService.error('Error updating password.'),
    });
  }

  onDeleteProfile(): void {
    this.confirmModalService
      .confirm({
        title: 'Delete profile',
        message: 'Are you sure you want to delete this profile?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
      })
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.profileService.deleteUserProfile()),
      )
      .subscribe({
        next: () => {
          this.toastService.success('Profile deleted successfully.');
          this.authService.logout();
        },
        error: () => this.toastService.error('Error deleting profile.'),
      });
  }
}
