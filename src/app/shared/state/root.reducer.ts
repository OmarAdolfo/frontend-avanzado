import { authReducer } from './auth/reducers/auth.reducers';
import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

export const reducers = {
    router: routerReducer,
    auth: authReducer
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];