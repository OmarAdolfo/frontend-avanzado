import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Language } from '../models/language.model';

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

    getLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    saveLanguage(language: Language): Observable<Language> {
        if (language.id !== -1) {
            return this.updateLanguage(language);
        } else {
            return this.addLanguage(language);
        }
    }

    addLanguage(language: Language): Observable<Language> {
        language.id = null;
        return this.http.post<Language>(this.apiurl, language).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    updateLanguage(language: Language): Observable<Language> {
        const url = `${this.apiurl}/${language.id}`;
        return this.http.put<Language>(url, language).pipe(
            map(() => language),
            catchError(this.handleError)
        );
    }
}