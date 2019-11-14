import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { user } from 'src/app/shared/state/user/selectors/user.selectors';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(user);
  }

  /* Comprueba si el usuario tiene el rol de estudiante */
  hasStudentRol(user: User) {
    return user.roles.find(rol => rol === 'student');
  }

  /* Comprueba si el usuario tiene el rol de empresa */
  hasCompanyRol(user: User) {
    return user.roles.find(rol => rol === 'company');
  }

}
