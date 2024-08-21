import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from './theme.service';

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
  isDocMode: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private themeService: ThemeService
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDocMode = this.router.url === '/forms';
      }
    });
  }
  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  homeTheme() {
    //home sayfasındayken iconun içi dolu olmasını sağlıyor.
    if (!this.isHomeMode) {
      this.router.navigate(['/']);
    }
  }
  goToLocalStorage() {
    //navigate ve favoriler sayfasındayken iconun içi dolu olmasını sağlıyor.
    this.router.navigate(['/local-storage']).then(
      (success) => console.log('Navigation successful: ', success),
      (error) => console.error('Navigation error: ', error)
    );
    if (!this.isFavMode) {
      this.router.navigate(['/local-storage']);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  goToForms() {
    if (!this.isDocMode) {
      this.router.navigate(['forms']);
    }
  }
}
