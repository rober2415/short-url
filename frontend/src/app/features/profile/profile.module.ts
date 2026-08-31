import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileDeleteComponent } from './components/profile-delete/profile-delete.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileDetailComponent,
    ProfileEditComponent,
    ProfileDeleteComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, SharedModule],
  exports: [
    ProfilePageComponent,
    ProfileDetailComponent,
    ProfileEditComponent,
    ProfileDeleteComponent,
  ],
})
export class ProfileModule {}
