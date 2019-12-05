import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutAuth } from '../../state/auth/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/store.interface';
import { selectorUser } from '../../state/user/selectors/user.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../models/user.model';
import { ROUTES_STUDENT, ROUTES_COMPANY } from '../../config/routes.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menuItems: object;
  user$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.store.select(selectorUser).subscribe(
      user => {
        if (user) {
          if (user.roles.find(rol => rol === 'student')) {
            this.menuItems = ROUTES_STUDENT;
          } else {
            this.menuItems = ROUTES_COMPANY;
          }
        }
      }
    );
  }

  navigate(path: string) {
    if (path === 'logout') {
      this.store.dispatch(new LogoutAuth());
    } else {
      this.router.navigate(['admin/' + path]);
    }
  }

  hasStudentRol(user: User) {
    return user.roles.find(rol => rol === 'student');
  }

}
