import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DictionaryService } from './dictionary.service';

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
  origin: string;
  meanings: Meaning[];
  tempWord: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tempWord: string = '';
  definition: DictionaryEntry | null = null;
  word: string = '';
  isDarkMode: boolean = false;

  constructor(
    private dictionaryService: DictionaryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  searchDefinition() {
    this.word = this.tempWord;
    if (this.word) {
      this.dictionaryService.getDefinition(this.word).subscribe(
        (data) => {
          this.definition = null;

          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i]) {
                this.definition = data[i];
                break;
              }
            }
          }

          if (!this.definition) {
            console.warn('No valid definition found in the data.');
          }
        },
        (error) => {
          console.error('Error:', error);
          this.definition = null;
        }
      );
    }
  }

  playAudio(audioUrl: string) {
    let audio = new Audio(audioUrl);
    audio.play();
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('light-mode');
    }
  }
}
