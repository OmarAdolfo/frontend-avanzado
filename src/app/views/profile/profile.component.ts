import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';
import { User } from 'src/app/shared/models/user.model';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';

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
    this.user$ = this.store.select(selectorUser);
  }

  /* Comprueba si el usuario tiene el rol de estudiante */
  hasStudentRol(user: User) {
    return user.roles.find(rol => rol === 'student');
  }

  /* Comprueba si el usuario tiene el rol de empresa */
  hasCompanyRol(user: User) {
    return user.roles.find(rol => rol === 'company');
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
