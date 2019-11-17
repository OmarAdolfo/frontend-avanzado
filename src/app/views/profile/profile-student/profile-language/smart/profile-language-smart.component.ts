import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/shared/state/store.interface';
import { Store } from '@ngrx/store';
import { selectorUser, getLanguageById } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-language-smart',
  templateUrl: './profile-language-smart.component.html',
  styleUrls: ['./profile-language-smart.component.scss']
})
export class ProfileLanguageSmartComponent implements OnInit {

  user$: Observable<any>;
  language$: Observable<any>;

  constructor(
    private store: Store<AppStore>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user$ = this.store.select(selectorUser);
    this.language$ = this.store.select(getLanguageById(this.activatedRoute.snapshot.params.id));
  }

  ngOnInit() {}

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
