import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: ThemeMode = 'system';
  isDarkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      this.currentTheme = savedTheme;
    }

    this.applyTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    this.isDarkMode =
      this.currentTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : this.currentTheme === 'dark';

    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
