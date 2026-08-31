import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent {
  @Input() profile: Profile | null = null;
  @Input() isLoading = true;
}
