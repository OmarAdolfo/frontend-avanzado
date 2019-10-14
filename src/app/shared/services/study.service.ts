import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CollegeStudy, VocationalStudy } from '../models/study.model';

@Injectable()
export class StudyService {

    apiurl = 'api/studies';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    saveStudy(study: (CollegeStudy | VocationalStudy)): Observable<(CollegeStudy | VocationalStudy)> {
        if (study.id !== -1) {
            return this.updateStudy(study);
        } else {
            return this.addStudy(study);
        }
    }

    addStudy(study: (CollegeStudy | VocationalStudy)): Observable<(CollegeStudy | VocationalStudy)> {
        study.id = null;
        return this.http.post<(CollegeStudy | VocationalStudy)>(this.apiurl, study).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    updateStudy(study: (CollegeStudy | VocationalStudy)): Observable<(CollegeStudy | VocationalStudy)> {
        const url = `${this.apiurl}/${study.id}`;
        return this.http.put<(CollegeStudy | VocationalStudy)>(url, study).pipe(
            map(() => study),
            catchError(this.handleError)
        );
    }

}