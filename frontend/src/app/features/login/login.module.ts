import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, FormsModule, LoginRoutingModule],
  exports: [LoginPageComponent, LoginFormComponent],
})
export class LoginModule {}
