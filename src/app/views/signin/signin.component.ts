import { Component, OnInit } from '@angular/core';
import { SignInService } from './signin-service.component';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  usersLogin: User[];

  constructor(
    private signInService: SignInService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.signInService.getUsers().subscribe(
      users => {
        this.usersLogin = users;
      }
    );
  }

}
