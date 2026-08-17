import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/core/models/auth.interface';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() registerSubmitted = new EventEmitter<AuthUser>();

  registerData: AuthUser = {
    name: '',
    email: '',
    password: '',
  };

  showPassword: boolean = false;

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) return;

    this.registerSubmitted.emit(this.registerData);
  }
}
