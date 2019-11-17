import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { selectorUser, getConfiguration, userSuccessMessage } from 'src/app/shared/state/user/selectors/user.selectors';

@Component({
  selector: 'app-favorites-smart',
  templateUrl: './favorites-smart.component.html',
  styleUrls: ['./favorites-smart.component.scss']
})
export class FavoritesSmartComponent implements OnInit {

  user$: Observable<any>;
  configuration$: Observable<any>;
  successMessage$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.user$ = this.store.select(selectorUser);
    this.configuration$ = this.store.select(getConfiguration);
    this.successMessage$ = this.store.select(userSuccessMessage);
  }

  ngOnInit() {
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
