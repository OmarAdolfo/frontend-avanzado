import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppStore } from 'src/app/shared/state/store.interface';
import { Store } from '@ngrx/store';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';

@Component({
  selector: 'app-profile-study-smart',
  templateUrl: './profile-study-smart.component.html',
  styleUrls: ['./profile-study-smart.component.scss']
})
export class ProfileStudySmartComponent implements OnInit {

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
