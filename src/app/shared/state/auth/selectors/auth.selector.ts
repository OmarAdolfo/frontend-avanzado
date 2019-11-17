import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../state/auth.state';

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