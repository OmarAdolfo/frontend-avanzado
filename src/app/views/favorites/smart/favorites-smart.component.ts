import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { selectorUser, getConfiguration } from 'src/app/shared/state/user/selectors/user.selectors';

@Component({
  selector: 'app-favorites-smart',
  templateUrl: './favorites-smart.component.html',
  styleUrls: ['./favorites-smart.component.scss']
})
export class FavoritesSmartComponent implements OnInit {

  user$: Observable<any>;
  configuration$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) {
    this.user$ = this.store.select(selectorUser);
    this.configuration$ = this.store.select(getConfiguration);
  }

  ngOnInit() {
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
