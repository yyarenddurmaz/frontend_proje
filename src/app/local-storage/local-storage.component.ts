import { Component, OnInit } from '@angular/core'; // Ensure OnInit is imported

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css'],
})
export class LocalStorageComponent implements OnInit {
  storedData: any;

  constructor() {}

  ngOnInit(): void {
    // Your initialization logic here
  }
}
