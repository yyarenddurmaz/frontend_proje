import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('darkMode') === 'true';
      this.isDarkModeSubject.next(savedTheme);
      this.applyTheme(savedTheme);
    }
  }

  toggleTheme() {
    const newTheme = !this.isDarkModeSubject.getValue();
    this.isDarkModeSubject.next(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
    this.applyTheme(newTheme);
  }

  private applyTheme(isDarkMode: boolean) {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }
}
