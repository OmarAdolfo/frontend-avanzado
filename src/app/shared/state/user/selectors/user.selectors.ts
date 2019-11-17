import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';
import * as userForm from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectorUser = createSelector(
    selectUserState,
    state => state.user
);

export const getConfiguration = createSelector(
    selectUserState,
    state => state.user.configuration
);

export const userSuccessMessage = createSelector(
    selectUserState,
    state => state.successMessage
);

export const userOffers = createSelector(
    selectUserState,
    state => state.user.offers
);

export const userHasRol = (rolName: string) => createSelector(
    selectUserState,
    userForm.hasRol(rolName)
);

export const getExperienceById = (id: string) => createSelector(
    selectUserState,
    userForm.getExperienceById(id)
);