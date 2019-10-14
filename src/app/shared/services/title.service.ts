import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TitleStudy } from '../models/study.model';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    apiurl = 'api/titles';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getTitleStudies(): Observable<TitleStudy[]> {
        return this.http.get<TitleStudy[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}