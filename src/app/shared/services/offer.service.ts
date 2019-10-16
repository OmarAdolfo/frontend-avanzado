import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { TitleStudy } from '../models/study.model';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    apiurl = 'api/offers';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    getOffers(titlesStudy: TitleStudy[]): Observable<Offer[]> {
        return this.http.get<Offer[]>(this.apiurl).pipe(
            map(offers => offers.filter(offer => this.existsElementsArrayInOtherArray(titlesStudy, offer.title)),
            catchError(this.handleError)
        ));
    }

    getOffer(id: number): Observable<Offer> {
        return this.http.get<Offer>(this.apiurl + '/' + id).pipe(
            catchError(this.handleError)
        );
    }

    existsElementsArrayInOtherArray(array1: any[], array2: any[]) {
        for (let element1 of array1) {
            for (let element2 of array2) {
                if (element1.uid === element2.uid) {
                    return true;
                }
            }
        }
        return false;
    }

}