import { AuthState } from './auth/reducers/auth.reducers';
import { UserState } from './user/reducers/user.reducer';

export interface AppStore {
    authState: AuthState;
    userState: UserState
}