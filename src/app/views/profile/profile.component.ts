import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  /* Comprueba si el usuario tiene el rol de estudiante */
  hasStudentRol() {
    return this.authService.hasStudentRol();
  }

  /* Comprueba si el usuario tiene el rol de empresa */
  hasCompanyRol() {
    return this.authService.hasCompanyRol();
  }

}
