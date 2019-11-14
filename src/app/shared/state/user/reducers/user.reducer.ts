import { User } from 'src/app/shared/models/user.model';
import { UserActionTypes, All } from '../actions/user.action';

export interface UserState {
    user: User;
    errorMessage: string | null;
}

export const initialState: UserState = {
    user: null,
    errorMessage: null
};

export function userReducer(state = initialState, action: All): UserState {
    switch (action.type) {
        case UserActionTypes.LOAD_USER: {
            return {
                ...state,
                user: action.payload,
                errorMessage: null
            };
        }
        case UserActionTypes.LOGOUT: {
            return {
                ...state,
                user: null,
                errorMessage: null
            };
        }
        case UserActionTypes.UPDATE_USER: {
            return {
                ...state,
                user: action.payload,
                errorMessage: null
            };
        }
        case UserActionTypes.UPDATE_USER_FAILED: {
            return {
                ...state,
                errorMessage: 'No se ha podido actualizar la información del usuario'
            };
        }
        default: {
            return state;
        }
    }
}