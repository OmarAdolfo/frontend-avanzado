import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { selectorUser, getExperienceById } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-experience-smart',
  templateUrl: './profile-experience-smart.component.html',
  styleUrls: ['./profile-experience-smart.component.scss']
})
export class ProfileExperienceSmartComponent implements OnInit {

  user$: Observable<any>;
  experience$: Observable<any>;

  constructor(
    private store: Store<AppStore>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user$ = this.store.select(selectorUser);
    this.experience$ = this.store.select(getExperienceById(this.activatedRoute.snapshot.params.id));
  }

  ngOnInit() {
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
