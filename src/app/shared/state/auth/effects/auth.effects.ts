import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { LoadUser } from '../../user/actions/user.action';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ) { }

    @Effect()
    logIn$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload => {
            return this.userService.login(payload.email, payload.password).pipe(
                map(user => new LogInSuccess(user)),
                catchError(error => of(new LogInFailure({ error })))
            )
        }));

    @Effect()
    loginSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        map((action: LogIn) => action.payload),
        switchMap(payload => of(new LoadUser(payload)))
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
            this.router.navigate(['/signin']);
        })
    );

}