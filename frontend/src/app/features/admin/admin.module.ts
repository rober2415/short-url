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
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RolesFormComponent,
    UsersFormComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminRoutingModule, SharedModule],
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
