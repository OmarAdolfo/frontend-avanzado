import { JobOffersState } from '../state/job-offers.state';
import { All, JobOffersActionTypes } from '../actions/job-offers.action';

export const initialState: JobOffersState = {
    offers: [],
    errorMessage: null
};

export function jobOffersReducer(state = initialState, action: All): JobOffersState {
    switch (action.type) {
        case JobOffersActionTypes.LOAD_JOB_OFFERS_SUCCESS: {
            return {
                ...state,
                offers: action.payload,
                errorMessage: null
            };
        }
        case JobOffersActionTypes.LOAD_JOB_OFFERS_FAILED: {
            return {
                ...state,
                errorMessage: null
            };
        }
        case JobOffersActionTypes.LOGOUT: {
            return {
                ...state,
                offers: [],
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}

export const getOfferById = (id: string) => (state: JobOffersState) => {
    return state.offers.find(offer => offer.id == Number(id));
};