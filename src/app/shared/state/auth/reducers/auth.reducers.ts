import { All, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    errorMessage: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    errorMessage: null
};

export function authReducer(state = initialState, action: All): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'El login no es correcto'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}