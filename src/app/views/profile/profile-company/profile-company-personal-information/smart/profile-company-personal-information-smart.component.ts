import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';

@Component({
  selector: 'app-profile-company-personal-information-smart',
  templateUrl: './profile-company-personal-information-smart.component.html',
  styleUrls: ['./profile-company-personal-information-smart.component.scss']
})
export class ProfileCompanyPersonalInformationSmartComponent implements OnInit {

  user$: Observable<any>;

  constructor(
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(selectorUser);
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
