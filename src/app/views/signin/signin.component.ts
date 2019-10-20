import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errorLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  /* Construye el formulario de login */
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  /* Realiza el proceso de login mediante email y contraseña */
  login() {
    this.userService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      user => {
        if (user) {
          this.authService.setUserLoggedIn(user);
          this.router.navigate(['dashboard']);
        } else {
          this.errorLogin = true;
        }
      }
    )
  }

}
