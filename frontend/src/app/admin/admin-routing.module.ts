import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPageComponent } from './roles/pages/roles-page/roles-page.component';
import { UsersPageComponent } from './users/pages/users-page/users-page.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    canActivate: [AdminGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
