import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isDarkMode: boolean = false;
  isHomeMode: boolean = false;
  isFavMode: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeMode = this.router.url === '/';
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isFavMode = this.router.url === '/local-storage';
      }
    });
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('light-mode');
    }
  }

  goToLocalStorage() {
    this.router.navigate(['/local-storage']).then(
      (success) => console.log('Navigation successful: ', success),
      (error) => console.error('Navigation error: ', error)
    );
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      document.body.classList.toggle('light-mode', !this.isDarkMode);
    }
  }
  homeTheme() {
    if (!this.isHomeMode) {
      this.router.navigate(['/']);
    }
  }
  favMode() {
    if (!this.isFavMode) {
      this.router.navigate(['/local-storage']);
    }
  }
}
