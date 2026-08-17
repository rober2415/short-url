import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [RegisterFormComponent, RegisterPageComponent],
  imports: [CommonModule, FormsModule, RegisterRoutingModule],
  exports: [RegisterFormComponent, RegisterPageComponent],
})
export class RegisterModule {}
