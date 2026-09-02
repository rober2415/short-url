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

@NgModule({
  declarations: [RolesPageComponent, UsersPageComponent, UsersTableComponent, RolesTableComponent, SidebarComponent, DashboardPageComponent, AdminLayoutComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [RolesPageComponent, UsersPageComponent, UsersTableComponent, RolesTableComponent, SidebarComponent, DashboardPageComponent, AdminLayoutComponent],
})
export class AdminModule {}
