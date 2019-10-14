import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LanguageLevel } from '../models/language.model';

@Injectable({
    providedIn: 'root'
})
export class LanguageLevelService {

    apiurl = 'api/languageLevels';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getLanguageLevels(): Observable<LanguageLevel[]> {
        return this.http.get<LanguageLevel[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}