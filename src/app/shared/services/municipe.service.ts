import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Municipe } from 'src/app/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class MunicipeService {

    apiurl = 'api/municipes';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getMunicipes(): Observable<Municipe[]> {
        return this.http.get<Municipe[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}