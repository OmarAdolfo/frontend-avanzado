import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service.component';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  usersLogin: User[];
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.usersLogin = users;
      }
    );
  }

  /* Construye el formulario de login */
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    const user = this.usersLogin.filter(user => user.email === this.loginForm.get('email').value && user.password === this.loginForm.get('password').value);
    if (user.length > 0) {
      this.router.navigate(['/profile/', user[0].id]);
    } else {
      console.log('No login');
    }
  }

}
