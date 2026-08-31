import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profile: Profile | null = null;
  isLoading = true;
  
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user profile', err);
        this.isLoading = false;
      },
    });
  }

  onDeleteProfile(): void {
    this.profileService.deleteUserProfile().subscribe({
      next: () => {
        console.log('User profile deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting user profile', err);
      },
    });
  }

  onUpdateProfile(profile: Profile): void {
    this.profileService.updateUserProfile(profile).subscribe({
      next: (updatedProfile) => {
        this.profile = updatedProfile;
      },
      error: (err) => {
        console.error('Error updating user profile', err);
      },
    });
  }
}
