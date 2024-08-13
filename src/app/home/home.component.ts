import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DictionaryService } from '../dictionary.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
}

@Component({
  selector: 'app-root',  // Adjusted selector for home component
  templateUrl: './home.component.html',  // Adjusted paths for home component
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tempWord: string = '';
  definition: DictionaryEntry | null = null;
  word: string = '';
  isDarkMode: boolean = false;


  constructor(
    private dictionaryService: DictionaryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {
    
  }

  goToLocalStorage() {
    this.router.navigate(['/local-storage']).then(
      success => console.log('Navigation successful: ', success),
      error => console.error('Navigation error: ', error)
    );
  }

  searchDefinition() {
    this.word = this.tempWord;
    if (this.word) {
      this.dictionaryService.getDefinition(this.word).subscribe(
        (data) => {
          this.definition = data?.[0] || null;
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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('light-mode');
    }
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('home-true');
    }
  }
}
