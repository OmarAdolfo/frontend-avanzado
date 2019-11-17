import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { JobOffersActionTypes, LoadJobOffers, LoadJobOffersSuccess, LoadJobOffersFailed } from '../actions/job-offers.action';
import { OfferService } from 'src/app/shared/services/offer.service';

@Injectable()
export class JobOffersEffects {

    constructor(
        private actions$: Actions,
        private offerService: OfferService
    ) { }

    @Effect()
    loadJobOffers$: Observable<any> = this.actions$.pipe(
        ofType(JobOffersActionTypes.LOAD_JOB_OFFERS),
        map((action: LoadJobOffers) => action.payload),
        switchMap(payload => {
            return this.offerService.getOffers(payload).pipe(
                map(user => new LoadJobOffersSuccess(user)),
                catchError(error => of(new LoadJobOffersFailed({ error })))
            )
        }));

}