import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
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

    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((action) => {
            this.authService.setUserLoggedIn(action.payload);
            this.router.navigate(['dashboard']);
        }));

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
            this.authService.setUserLoggedIn(null);
            this.router.navigate(['/signin']);
        })
    );
}