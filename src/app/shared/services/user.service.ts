import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

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

    getUser(id: number): Observable<User> {
        return this.http.get<User>(this.apiurl + '/' + id).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    saveUser(user: User): Observable<User> {
        if (user.id !== -1) {
            return this.updateUser(user);
        } else {
            return this.addUser(user);
        }
    }

    addUser(user: User): Observable<User> {
        user.id = null;
        return this.http.post<User>(this.apiurl, user).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    updateUser(user: User): Observable<User> {
        const url = `${this.apiurl}/${user.id}`;
        return this.http.put<User>(url, user).pipe(
            map(() => user),
            catchError(this.handleError)
        );
    }

}