import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/store.interface';
import { Logout } from '../../state/user/actions/user.action';
import { Observable } from 'rxjs';
import { selectorUser } from '../../state/user/selectors/user.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  user$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<AppStore>
  ) {
    this.user$ = this.store.select(selectorUser);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToOffers() {
    this.router.navigate(['/offers']);
  }

  goToMyOffers() {
    this.router.navigate(['/my-offers']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  hasStudentRol(user: User) {
    return user.roles.find(rol => rol === 'student');
  }

}
