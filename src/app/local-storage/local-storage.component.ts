import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css'],
})
export class LocalStorageComponent implements OnInit {
  storedData: { word: string; meaning: any }[] = [];
  isDarkMode: boolean = false;
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string | undefined;
  noDefinitionMessage: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStoredData();
    }
  }

  loadStoredData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const favWords = localStorage.getItem('favoriteWords');
      if (favWords) {
        const words = JSON.parse(favWords) as string[];
        this.storedData = words.map((word) => {
          const meaning = JSON.parse(localStorage.getItem(word) || '{}');
          return { word, meaning };
        });
      } else {
        console.warn(this.translate.instant('Nodef'));
        this.noDefinitionMessage = this.translate.instant('Nodef');
        this.storedData = [];
      }
    }
  }

  deleteWord(word: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const confirmed = confirm(
        this.translate.instant('CONFIRM_REMOVE', { word })
      );
      if (confirmed) {
        this.storedData = this.storedData.filter((item) => item.word !== word);

        localStorage.removeItem(word);

        const updatedFavWords = this.storedData.map((item) => item.word);
        localStorage.setItem('favoriteWords', JSON.stringify(updatedFavWords));
      }
    }
  }

  clearAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const confirmed = confirm(this.translate.instant('allremovedsure'));
      if (confirmed) {
        localStorage.clear();
        this.storedData = [];

        this.notificationMessage = this.translate.instant('allwordsremoved');
        this.showNotification = true;
      } else {
        return;
      }
    }
    this.showNotification = true;
    setTimeout(() => (this.showNotification = false), 4000);
  }
}
