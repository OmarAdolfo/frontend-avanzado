import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { Observable } from 'rxjs';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';

@Component({
  selector: 'app-profile-student-personal-information-smart',
  templateUrl: './profile-student-personal-information-smart.component.html',
  styleUrls: ['./profile-student-personal-information-smart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileStudentPersonalInformationSmartComponent {

  user$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.user$ = this.store.select(selectorUser);
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
