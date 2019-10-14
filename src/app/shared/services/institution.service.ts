import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Institution } from '../models/study.model';

@Injectable({
    providedIn: 'root'
})
export class InstitutionService {

    apiurl = 'api/institutions';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getInstitutions(): Observable<Institution[]> {
        return this.http.get<Institution[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}