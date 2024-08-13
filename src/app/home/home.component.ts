import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DictionaryService } from '../dictionary.service';
import { Router } from '@angular/router';

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
  origin?: string; // Origin optional hale getirildi, çünkü her kelimede olmayabilir.
  meanings: Meaning[];
}

@Component({
  selector: 'app-home', // Selector düzenlendi.
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

  constructor(
    private dictionaryService: DictionaryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedFavorites = localStorage.getItem('favoriteWords');
      if (storedFavorites) {
        this.favoriteWords = JSON.parse(storedFavorites);
      }
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('light-mode');
      document.body.classList.add('home-true');
    }
  }

  goToLocalStorage() {
    this.router.navigate(['/local-storage']).then(
      (success) => console.log('Navigation successful:', success),
      (error) => console.error('Navigation error:', error)
    );
  }

  searchDefinition() {
    this.word = this.tempWord;
    this.noDefinitionMessage = null; // Mesajı sıfırla

    if (this.word) {
      this.dictionaryService.getDefinition(this.word).subscribe(
        (data) => {
          this.definition = data?.[0] || null;
          if (!this.definition) {
            this.noDefinitionMessage =
              'No valid definition found for the word.';
          }
        },
        (error) => {
          console.error('Error:', error);
          this.noDefinitionMessage = 'No definitions.';
          this.definition = null;
        }
      );
    }
  }

  playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      document.body.classList.toggle('light-mode', !this.isDarkMode);
    }
  }

  toggleFavorite() {
    if (this.isFavorite(this.word)) {
      this.favoriteWords = this.favoriteWords.filter((w) => w !== this.word);
    } else {
      this.favoriteWords.push(this.word);
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('favoriteWords', JSON.stringify(this.favoriteWords));
    }
  }

  isFavorite(word: string): boolean {
    return this.favoriteWords.includes(word);
  }
}
