import { Student } from 'src/app/shared/models/user.model';
import { UserActionTypes, All } from '../actions/user.action';
import { UserState } from '../state/user.state';

export const initialState: UserState = {
    user: null,
    successMessage: null,
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
        case UserActionTypes.UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                successMessage: 'Se ha actualizado de forma correcta el usuario',
                errorMessage: null
            };
        }
        case UserActionTypes.UPDATE_USER_FAILED: {
            return {
                ...state,
                successMessage: null,
                errorMessage: 'No se ha podido actualizar la información del usuario'
            };
        }
        default: {
            return state;
        }
    }
}

export const hasRol = (rolName: string) => (state: UserState) => {
    return state.user.roles.find(rol => rol === rolName) ? true : false
}

export const getExperienceById = (id: string) => (state: UserState) => {
    if (id !== 'new') {
        return (state.user as Student).experiencies.find(experiencie => experiencie.id == Number(id));
    } else {
        return {
            id: -1,
            company: '',
            position: '',
            dateInitial: '',
            dateEnd: '',
            tasks: ''
        }
    }
};