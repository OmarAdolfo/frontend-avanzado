import { authReducer } from './auth/reducers/auth.reducers';
import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { userReducer } from './user/reducers/user.reducer';

export const reducers = {
    router: routerReducer,
    auth: authReducer,
    user: userReducer
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];