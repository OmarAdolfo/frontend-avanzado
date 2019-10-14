import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Grade } from '../models/study.model';

@Injectable({
    providedIn: 'root'
})
export class GradeService {

    apiurl = 'api/grades';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getGrades(): Observable<Grade[]> {
        return this.http.get<Grade[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}