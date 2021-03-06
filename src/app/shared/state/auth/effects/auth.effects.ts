import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { LoadUser, LogoutUser } from '../../user/actions/user.action';
import { LogoutJobOffers, LoadJobOffers } from '../../job-offers/actions/job-offers.action';
import { Student } from 'src/app/shared/models/user.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
declare const $: any;

@Injectable()
export class AuthEffects {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        public snackBar: MatSnackBar
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
        map((action: LogInSuccess) => action.payload),
        mergeMap(payload => {
            if (payload.roles.find(rol => rol === 'student')) {
                return [
                    new LoadUser(payload),
                    new LoadJobOffers((payload as Student).studies.map(study => study.title))
                ]
            } else {
                return [
                    new LoadUser(payload)
                ];
            }

        })
    );

    @Effect({ dispatch: false })
    loginFailed$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap(() =>
            this.snackBar.open('Error', 'Login incorrecto.', {
                verticalPosition: this.verticalPosition,
                horizontalPosition: this.horizontalPosition,
                duration: 2000,
            })
        )
    );

    @Effect()
    logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        mergeMap(() => {
            this.router.navigate(['/signin']);
            return [
                new LogoutUser(),
                new LogoutJobOffers()
            ]
        })
    );

}