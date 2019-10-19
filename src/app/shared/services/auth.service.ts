import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

    private userLogged: User;

    constructor() { }

    setUserLoggedIn(user: User) {
        this.userLogged = user;
    }

    getUserLoggedIn(): User {
        return this.userLogged;
    }

    isLogged() {
        return this.userLogged ? true : false;
    }

    hasStudentRol() {
        return this.userLogged.roles.find(rol => rol === 'student');
    }

    hasCompanyRol() {
        return this.userLogged.roles.find(rol => rol === 'company');
    }

}