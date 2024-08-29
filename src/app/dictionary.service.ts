import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private apiUrl = environment.dictApiUrl;


  constructor(private http: HttpClient,
    private translate: TranslateService
  ) {}

  getDefinition(word: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${word}`).pipe(
      catchError(error => {
        console.error(this.translate.instant('home.ERROR_FETCHING_DEFINITIONS'), error);
        return throwError(() => new Error('Failed to fetch the definition. Please try again later.'));
      })
    );
  }
}
