import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersTableComponent } from './users/components/users-table/users-table.component';
import { RolesPageComponent } from './roles/pages/roles-page/roles-page.component';
import { UsersPageComponent } from './users/pages/users-page/users-page.component';

@NgModule({
  declarations: [RolesPageComponent, UsersPageComponent, UsersTableComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [RolesPageComponent, UsersPageComponent, UsersTableComponent],
})
export class AdminModule {}
