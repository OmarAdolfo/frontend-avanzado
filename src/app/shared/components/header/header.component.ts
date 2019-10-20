import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public authService: AuthService
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
    this.authService.setUserLoggedIn(null);
    this.router.navigate(['/signin']);
  }

}
