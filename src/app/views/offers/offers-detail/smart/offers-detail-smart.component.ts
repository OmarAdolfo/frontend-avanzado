import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { ActivatedRoute } from '@angular/router';
import { selectorUser } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';
import { getOfferById } from 'src/app/shared/state/job-offers/selectors/job-offers.selectors';

@Component({
  selector: 'app-offers-detail-smart',
  templateUrl: './offers-detail-smart.component.html',
  styleUrls: ['./offers-detail-smart.component.scss']
})
export class OffersDetailSmartComponent implements OnInit {

  user$: Observable<any>;
  offer$: Observable<any>;

  constructor(
    private store: Store<AppStore>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user$ = this.store.select(selectorUser);
    this.offer$ = this.store.select(getOfferById(this.activatedRoute.snapshot.params.id));
  }

  ngOnInit() {
  }

  updateUser(user: any) {
    this.store.dispatch(new UpdateUser(user));
  }

}
