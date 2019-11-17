import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobOffersState } from '../state/job-offers.state';
import * as jobOfferForm from '../reducers/job-offers.reducers';

export const selectJobOffersState = createFeatureSelector<JobOffersState>('jobOffers');

export const selectorJobOffers = createSelector(
    selectJobOffersState,
    state => state.offers
);

export const getOfferById = (id: string) => createSelector(
    selectJobOffersState,
    jobOfferForm.getOfferById(id)
);