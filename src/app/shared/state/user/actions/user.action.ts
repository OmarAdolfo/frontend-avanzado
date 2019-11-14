import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LOAD_USER = '[User] Load user',
    LOGOUT = '[User] Logout',
    UPDATE_USER = '[User] Update User Personal Information',
    UPDATE_USER_SUCCESS = '[User] Update User Success',
    UPDATE_USER_FAILED = '[User] Update User Failed'
}

export class LoadUser implements Action {
    readonly type = UserActionTypes.LOAD_USER;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = UserActionTypes.LOGOUT;
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;
    constructor(public payload: any) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateUserFailed implements Action {
    readonly type = UserActionTypes.UPDATE_USER_FAILED;
    constructor(public payload: any) { }
}

export type All =
    | LoadUser
    | Logout
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFailed;