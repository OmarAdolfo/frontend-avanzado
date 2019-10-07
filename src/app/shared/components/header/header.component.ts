import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) { }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToOffers() {
    this.router.navigate(['/offers']);
  }

}
