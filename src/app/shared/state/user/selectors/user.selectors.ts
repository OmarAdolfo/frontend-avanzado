import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';
import * as userForm from '../reducers/user.reducer';
import { Student } from 'src/app/shared/models/user.model';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectorUser = createSelector(
    selectUserState,
    state => state.user
);

export const getConfiguration = createSelector(
    selectUserState,
    state => state.user.configuration
);

export const userOffers = createSelector(
    selectUserState,
    state => state.user.offers
);

export const userStudies = createSelector(
    selectUserState,
    state => (state.user as Student).studies
);

export const userHasRol = (rolName: string) => createSelector(
    selectUserState,
    userForm.hasRol(rolName)
);

export const getExperienceById = (id: string) => createSelector(
    selectUserState,
    userForm.getExperienceById(id)
);

export const getLanguageById = (id: string) => createSelector(
    selectUserState,
    userForm.getLanguageById(id)
);

export const getStudyById = (id: string) => createSelector(
    selectUserState,
    userForm.getStudyById(id)
);