import { User } from '../../../models/user.model';
import { All, AuthActionTypes } from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function authReducer(state = initialState, action: All): AuthState {
    console.log(action);
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'El login no es correcto'
            };
        }
        default: {
            return state;
        }
    }
}