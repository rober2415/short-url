import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/core/models/auth.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    if (this.authService.consumeSessionExpiredFlag()) {
      this.errorMessage = 'Your session has expired. Please sign in again.';
    }
  }

  onLogin(loginData: AuthUser): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(loginData).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage =
            'Incorrect login details. Please check your email address and password.';
        } else {
          this.errorMessage =
            'An error occurred whilst trying to log in. Please try again.';
        }
      },
    });
  }
}
