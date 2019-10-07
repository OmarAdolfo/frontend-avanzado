import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    isUserLoggedIn: boolean;
    usserLogged: User;

    constructor() {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn(user: User) {
        this.isUserLoggedIn = true;
        this.usserLogged = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUserLoggedIn(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

}