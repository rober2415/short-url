import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { RolesTableComponent } from './components/roles/roles-table/roles-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AdminLayoutComponent } from 'src/app/layout/admin-layout/admin-layout.component';
import { RolesEditComponent } from './components/roles/roles-edit/roles-edit.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RolesPageComponent,
    UsersPageComponent,
    UsersTableComponent,
    RolesTableComponent,
    SidebarComponent,
    DashboardPageComponent,
    AdminLayoutComponent,
    RolesEditComponent,
    UsersEditComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, SharedModule],
  exports: [
    RolesPageComponent,
    UsersPageComponent,
    UsersTableComponent,
    RolesTableComponent,
    SidebarComponent,
    DashboardPageComponent,
    AdminLayoutComponent,
  ],
})
export class AdminModule {}
