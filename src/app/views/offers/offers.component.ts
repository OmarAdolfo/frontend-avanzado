import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/shared/services/offer.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { Province } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers: Offer[] = [];
  provinces: Province[] = [];
  searchOffersForm: FormGroup;

  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.offerService.getOffers(this.userService.getUserLoggedIn().studies.map(study => study.title))
      .subscribe(
        offers => {
          this.offers = offers;
        }
      );
    this.getProvinces();
    this.buildForm();
  }

  getProvinces() {
    this.provinceService.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
      }
    )
  }

  buildForm() {
    this.searchOffersForm = this.fb.group({
      date: new FormControl('', DateValidator),
      province: new FormControl('')
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['./offers/detail/', id], { relativeTo: this.activatedRoute });
  }

}
