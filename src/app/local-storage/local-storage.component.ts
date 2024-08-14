import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css'],
})
export class LocalStorageComponent implements OnInit {
  storedData: { word: string; meaning: any }[] = [];
  isDarkMode: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStoredData();
    } else {
      console.warn('Local Storage is not available in this environment.');
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
        console.warn('No data found in Local Storage.');
        this.storedData = [];
      }
    }
  }

  deleteWord(word: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const confirmed = confirm(
        `Are you sure you want to remove "${word}" from your favorites?`
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
      localStorage.clear();
      this.storedData = [];
    }
  }
}
