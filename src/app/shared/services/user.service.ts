import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    userLogged: User;

    constructor() {}

    setUserLoggedIn(user: User) {
        this.userLogged = user;
    }

    getUserLoggedIn(): User {
        return this.userLogged;
    }

}