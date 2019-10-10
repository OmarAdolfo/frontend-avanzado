import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Province } from 'src/app/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class ProvinceService {

    apiurl = 'api/provinces';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getProvinces(): Observable<Province[]> {
        return this.http.get<Province[]>(this.apiurl).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
}