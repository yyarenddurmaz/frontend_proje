import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private apiUrl = environment.dictApiUrl;

  constructor(private http: HttpClient) {}

  getDefinition(word: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${word}`).pipe(
      catchError(error => {
        console.error('Error fetching definition:', error);
        return throwError(() => new Error('Failed to fetch the definition. Please try again later.'));
      })
    );
  }
}
