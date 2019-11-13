import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Logout } from '../../state/auth/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/store.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private store: Store<AppStore>
  ) { }

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

}
