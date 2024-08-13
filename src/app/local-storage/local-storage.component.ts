import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css'],
})
export class LocalStorageComponent implements OnInit {
  storedData: any;
  word: HomeComponent | null = null;
  definition: HomeComponent | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadStoredData();
  }

  loadStoredData(): void {
    const favWord = localStorage.getItem('favoriteWords');
    const favDef=localStorage.getItem("favoriteWordsDefinitions")
    if (favWord) {
      this.storedData = JSON.parse(favWord);
    } else {
      console.warn('No data found in localStorage.');
      this.storedData = [];
    }
  }
}
