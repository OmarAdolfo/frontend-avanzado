import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    apiurl = 'api/users';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}