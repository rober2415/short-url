import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/core/models/auth.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = false;
  errorMessage: string = '';

  onRegister(registerData: AuthUser): void {
    if (!registerData.name || !registerData.email || !registerData.password) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 409 || error.status === 422) {
          this.errorMessage = 'A user with that email address already exists.';
        } else {
          this.errorMessage =
            'An error occurred whilst you were registering. Please try again.';
        }
      },
    });
  }
}
