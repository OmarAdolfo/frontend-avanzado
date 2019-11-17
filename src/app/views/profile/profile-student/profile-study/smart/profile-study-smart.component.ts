import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppStore } from 'src/app/shared/state/store.interface';
import { Store } from '@ngrx/store';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { selectorUser, getStudyById, userStudies } from 'src/app/shared/state/user/selectors/user.selectors';
import { ActivatedRoute } from '@angular/router';
import { LoadJobOffers } from 'src/app/shared/state/job-offers/actions/job-offers.action';

@Component({
  selector: 'app-profile-study-smart',
  templateUrl: './profile-study-smart.component.html',
  styleUrls: ['./profile-study-smart.component.scss']
})
export class ProfileStudySmartComponent implements OnInit {

  user$: Observable<any>;
  study$: Observable<any>;

  constructor(
    private store: Store<AppStore>,
    private activatedRoute: ActivatedRoute
  ) {
    this.user$ = this.store.select(selectorUser);
    this.study$ = this.store.select(getStudyById(this.activatedRoute.snapshot.params.id));
  }

  ngOnInit() {
    this.store.select(userStudies).subscribe(
      studies => {
        this.store.dispatch(new LoadJobOffers(studies.map(study => study.title)));
      }
    );
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
