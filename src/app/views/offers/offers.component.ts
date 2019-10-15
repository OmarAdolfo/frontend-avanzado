import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/shared/services/offer.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { Study } from 'src/app/shared/models/study.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.offerService.getOffers(this.userService.getUserLoggedIn().studies.map(study => study.title))
    .subscribe(
      offers => {
        this.offers = offers;
      }
    )
  }

}
