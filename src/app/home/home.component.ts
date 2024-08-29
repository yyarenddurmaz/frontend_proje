import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DictionaryService } from '../dictionary.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { throws } from 'assert';
import { ThemeService } from '../theme.service';
import { TranslateService } from '@ngx-translate/core';

interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tempWord: string = '';
  definition: DictionaryEntry | null = null;
  word: string = '';
  isDarkMode: boolean = false;
  favoriteWords: string[] = [];
  noDefinitionMessage: string | null = null;
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string | undefined;
  isLoading: boolean = false;

  constructor(
    private dictionaryService: DictionaryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private translate: TranslateService,

    private themeService: ThemeService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedFavorites = localStorage.getItem('favoriteWords');
      if (storedFavorites) {
        this.favoriteWords = JSON.parse(storedFavorites);
      }
    }
  }
  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  searchDefinition() {
    this.isLoading = true;
    setTimeout(() => {
      this.word = this.tempWord.toLowerCase();
      this.noDefinitionMessage = null;

      if (this.word) {
        this.dictionaryService.getDefinition(this.word).subscribe(
          (data) => {
            this.definition = data?.[0] || null;
            if (!this.definition) {
              this.noDefinitionMessage =
                this.translate.instant('home.NO_DEFINITIONS');
            }
            this.isLoading = false;
          },
          (error) => {
            console.error(this.translate.instant('home.ERROR'), error);;
            this.noDefinitionMessage = this.translate.instant(
              'home.ERROR_FETCHING_DEFINITIONS'
            );
            this.definition = null;
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
      }
    }, 1000);
  }

  playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
  }

  toggleFavorite(): void {
    if (this.isFavorite(this.word)) {
      const confirmed = confirm(
        this.translate.instant('favorites.CONFIRM_REMOVE_FAVORITES', { word: this.word })
      );
      if (confirmed) {
        this.favoriteWords = this.favoriteWords.filter((w) => w !== this.word);
        localStorage.removeItem(this.word);

        this.notificationMessage = this.translate.instant('favorites.REMOVED_FROM_FAVORITES', {
          word: this.word,
        });
        this.notificationType = 'removed';
        this.showNotification = true;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(
            'favoriteWords',
            JSON.stringify(this.favoriteWords)
          );
        }

        this.showNotification = true;
        setTimeout(() => (this.showNotification = false), 4000);
      }
    } else {
      this.favoriteWords.push(this.word);
      localStorage.setItem(this.word, JSON.stringify(this.definition));

      this.notificationMessage = this.translate.instant('favorites.ADDED_TO_FAVORITES', {
        word: this.word,
      });
      this.notificationType = 'added';
      this.showNotification = true;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(
          'favoriteWords',
          JSON.stringify(this.favoriteWords)
        );
      }

      this.showNotification = true;
      setTimeout(() => (this.showNotification = false), 4000);
    }
  }

  isFavorite(word: string): boolean {
    return this.favoriteWords.includes(word);
  }
}
