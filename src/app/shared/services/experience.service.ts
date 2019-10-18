import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Experience } from '../models/experience.model';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {

    apiurl = 'api/experiencies';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getExperiences(): Observable<Experience[]> {
        return this.http.get<Experience[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    getExperience(id: number): Observable<Experience> {
        return this.http.get<Experience>(this.apiurl + '/' + id).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    saveExperience(experience: Experience): Observable<Experience> {
        if (experience.id !== -1) {
            return this.updateExperience(experience);
        } else {
            return this.addExperience(experience);
        }
    }

    addExperience(experience: Experience): Observable<Experience> {
        experience.id = null;
        return this.http.post<Experience>(this.apiurl, experience).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    updateExperience(experience: Experience): Observable<Experience> {
        const url = `${this.apiurl}/${experience.id}`;
        return this.http.put<Experience>(url, experience).pipe(
            map(() => experience),
            catchError(this.handleError)
        );
    }
}