import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStore } from '../state/store.interface';
import { tap } from 'rxjs/operators';
import { isAuthenticated } from '../state/auth/selectors/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppStore>
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /* Si el usuario esta logueado y accede al login, se reenvia a la pantalla de dashboard */
    return this.store
      .pipe(
        select(isAuthenticated),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['signin']);
          }
        })
      );
  }

}