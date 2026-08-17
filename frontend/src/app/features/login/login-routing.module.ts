import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GuestGuard } from 'src/app/core/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
