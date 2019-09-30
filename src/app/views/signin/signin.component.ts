import { Component, OnInit } from '@angular/core';
import { SignInService } from './signin-service.component';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  usersLogin: User[];
  loginForm: FormGroup;

  constructor(
    private signInService: SignInService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUsers();
  }

  getUsers() {
    this.signInService.getUsers().subscribe(
      users => {
        this.usersLogin = users;
      }
    );
  }

  /* Construye el formulario de login */
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    console.log(this.loginForm);
  }

  login() {
    if (this.usersLogin.filter(user => user.email === this.loginForm.get('email').value && user.password === this.loginForm.get('password').value).length > 0) {
      console.log('Login');
    } else {
      console.log('No login');
    }
  }

}
