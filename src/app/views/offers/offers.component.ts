import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { userHasRol, userOffers } from 'src/app/shared/state/user/selectors/user.selectors';
import { selectorJobOffers } from 'src/app/shared/state/job-offers/selectors/job-offers.selectors';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  rolStudent$: Observable<any>;
  rolCompany$: Observable<any>;
  offersList$: Observable<any>;
  offersProfile$: Observable<any>;
  myOffers = true;

  constructor(
    private route: Router,
    private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.myOffers = this.route.url === '/my-offers';
    this.rolStudent$ = this.store.select(userHasRol('student'));
    this.rolCompany$ = this.store.select(userHasRol('company'));
    this.offersList$ = this.store.select(selectorJobOffers);
    this.offersProfile$ = this.store.select(userOffers);
  }
}
