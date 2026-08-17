import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeMode, ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
  ) {}

  setTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }

  logout(): void {
    this.authService.logout(); 
  }
}
