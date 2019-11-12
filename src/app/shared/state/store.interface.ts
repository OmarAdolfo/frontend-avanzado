import { AuthState } from './auth/reducers/auth.reducers';

export interface AppStore {
    authState: AuthState;
}