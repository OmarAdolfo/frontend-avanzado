import { UserState } from './user/state/user.state';
import { JobOffersState } from './job-offers/state/job-offers.state';
import { AuthState } from './auth/state/auth.state';

export interface AppStore {
    authState: AuthState;
    userState: UserState;
    jobOffersState: JobOffersState
}