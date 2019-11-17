import { Action } from '@ngrx/store';
import { TitleStudy } from 'src/app/shared/models/study.model';

export enum JobOffersActionTypes {
    LOAD_JOB_OFFERS = '[Job Offers] Load Job Offers',
    LOAD_JOB_OFFERS_SUCCESS = '[Job Offers] Load Job Offers Success',
    LOAD_JOB_OFFERS_FAILED = '[Job Offers] Load Job Offers Failed',
    LOGOUT = '[Job Offers] Logout',
}

export class LoadJobOffers implements Action {
    readonly type = JobOffersActionTypes.LOAD_JOB_OFFERS;
    constructor(public payload: TitleStudy[]) { }
}

export class LoadJobOffersSuccess implements Action {
    readonly type = JobOffersActionTypes.LOAD_JOB_OFFERS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadJobOffersFailed implements Action {
    readonly type = JobOffersActionTypes.LOAD_JOB_OFFERS_FAILED;
    constructor(public payload: any) { }
}

export class LogoutJobOffers implements Action {
    readonly type = JobOffersActionTypes.LOGOUT;
}

export type All =
    | LoadJobOffers
    | LoadJobOffersSuccess
    | LoadJobOffersFailed
    | LogoutJobOffers;