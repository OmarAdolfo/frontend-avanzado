import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LanguageName } from '../models/language.model';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    apiurl = 'api/languages';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getLanguages(): Observable<LanguageName[]> {
        return this.http.get<LanguageName[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    addLanguage(languageName: LanguageName): Observable<LanguageName> {
        languageName.id = null;
        return this.http.post<LanguageName>(this.apiurl, languageName).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}