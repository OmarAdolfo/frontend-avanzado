import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Category } from '../models/study.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    apiurl = 'api/categories';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}