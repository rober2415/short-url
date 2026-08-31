import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthUser } from 'src/app/core/models/auth.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() loginSubmitted = new EventEmitter<AuthUser>();

  loginData: AuthUser = {
    email: 'demo@example.com',
    password: 'demoexample',
  };

  showPassword: boolean = false;

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.loginData.email || !this.loginData.password) return;

    this.loginSubmitted.emit(this.loginData);
  }
}
