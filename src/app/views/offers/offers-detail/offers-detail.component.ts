import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/shared/services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/shared/models/offer.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.component.html',
  styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {

  model: Offer;
  offerForm: FormGroup;

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.offerService.getOffer(this.activatedRoute.snapshot.params.id).subscribe(
      offer => {
        this.model = offer;
        this.buildForm();
      }
    )
  }

  buildForm() {
    this.offerForm = this.fb.group({
      company: new FormControl(this.model.company.name),
      jobName: new FormControl(this.model.job.name),
      jobDescription: new FormControl(this.model.job.description),
      province: new FormControl(this.model.province.name),
      municipe: new FormControl(this.model.municipe.name),
      category: new FormControl(this.model.category.name)
    });
    this.offerForm.disable();
  }

  register() {
    const user = this.userService.getUserLoggedIn();
    user.offers.push(this.model);
    this.userService.saveUser(user).subscribe(
      user => {
        console.log(user);
        this.location.back();
      }
    )
  }

}
