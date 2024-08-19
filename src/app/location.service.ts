import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = 'https://turkiyeapi.dev/api/v1';

  constructor(private http: HttpClient) {}

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/provinces`);
  }
  
  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/districts`);
  }
  
  
}
