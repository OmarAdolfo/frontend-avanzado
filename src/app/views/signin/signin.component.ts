import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private signinService: SigninService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
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

  login() {
    this.signinService.getUsers().subscribe(
      users => {
        const user = users.find(user => user.email === this.loginForm.get('email').value && user.password === this.loginForm.get('password').value);
        if (user) {
          this.userService.setUserLoggedIn(user);
          this.router.navigate(['dashboard']);
        } else {
          console.log('No loggin');
        }
      }
    );
  }

}
