import { Component } from '@angular/core';
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
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  word: string = '';
  definition: DictionaryEntry | null = null;

  constructor(private dictionaryService: DictionaryService) {}

  searchDefinition() {
    if (this.word) {
      this.dictionaryService.getDefinition(this.word).subscribe(
        data => {
          if (data && data.length > 0) {
            this.definition = data[0];
          } else {
            this.definition = null;
          }
        },
        error => {
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
}
