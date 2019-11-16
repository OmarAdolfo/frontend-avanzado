import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';

@Component({
  selector: 'app-profile-experience-smart',
  templateUrl: './profile-experience-smart.component.html',
  styleUrls: ['./profile-experience-smart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileExperienceSmartComponent implements OnInit {

  user$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.user$ = this.store.select(selectorUser);
  }

  ngOnInit() {
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
