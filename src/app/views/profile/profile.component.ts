import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
  }

  hasStudentRol() {
    return this.authService.hasStudentRol();
  }

  hasCompanyRol() {
    return this.authService.hasCompanyRol();
  }

}
