import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserActionTypes, UpdateUser, UpdateUserSuccess, UpdateUserFailed } from '../actions/user.action';
import { of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar } from '@angular/material';

@Injectable()
export class UserEffects {

    routesNoNavigate = ['/admin/profile', '/admin/favorites'];ç
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService,
        private location: Location,
        public snackBar: MatSnackBar
    ) { }

    @Effect({ dispatch: false })
    loadUser$ = this.actions$.pipe(
        ofType(UserActionTypes.LOAD_USER),
        tap(() => {
            this.router.navigate(['admin/dashboard']);
        })
    );

    @Effect()
    updateUser$ = this.actions$.pipe(
        ofType(UserActionTypes.UPDATE_USER),
        map((action: UpdateUser) => action.payload),
        switchMap(payload => {
            return this.userService.saveUser(payload).pipe(
                map(user => new UpdateUserSuccess(user)),
                catchError(error => of(new UpdateUserFailed(error)))
            )
        }));

    @Effect({ dispatch: false })
    updateUserSuccess$ = this.actions$.pipe(
        ofType(UserActionTypes.UPDATE_USER_SUCCESS),
        map((action: UpdateUserSuccess) => action.payload),
        tap(() => {
            if (this.routesNoNavigate.indexOf(this.router.url) === -1) {
                this.location.back();
            } else {
                this.snackBar.open('Éxito', 'Se han modificado los datos del usuario', {
                    verticalPosition: this.verticalPosition,
                    horizontalPosition: this.horizontalPosition,
                    duration: 2000,
                })
            }
        }));
}