import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { environment } from './../environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
  isArrayMode: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private themeService: ThemeService,
    private translate: TranslateService
  ) {

    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');

    if (isPlatformBrowser(this.platformId)) {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang && browserLang.match(/en|tr/) ? browserLang : 'en');
    }

    console.log(environment.production);
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isArrayMode = this.router.url === '/array';
      }
    });
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }
  switchLanguage(language: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(language);
    }
  }
  homeTheme() {
    //home sayfasındayken iconun içi dolu olmasını sağlıyor.
    if (!this.isHomeMode) {
      this.router.navigate(['/']);
    }
  }
  goToLocalStorage() {
    //navigate ve favoriler sayfasındayken iconun içi dolu olmasını sağlıyor.
    this.router.navigate(['/local-storage']);
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

  goToArray() {
    if (!this.isArrayMode) {
      this.router.navigate(['array']);
    }
  }
}
