import { AuthState } from '../reducers/auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>(
    'auth'
);

export const userErrorMessage = createSelector(
    selectAuthState,
    (state: AuthState) => state.errorMessage
);

export const isAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);