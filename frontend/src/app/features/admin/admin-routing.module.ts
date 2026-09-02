import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AdminLayoutComponent } from 'src/app/layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: DashboardPageComponent,
      },
      {
        path: 'roles',
        component: RolesPageComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: UsersPageComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
