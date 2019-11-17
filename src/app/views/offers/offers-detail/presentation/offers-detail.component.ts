import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/shared/models/offer.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.component.html',
  styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {

  @Input() offer: Offer;
  @Input() user: User;
  @Output() updateUser = new EventEmitter();
  offerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    public router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  /* Construye el formulario de las ofertas */
  buildForm() {
    this.offerForm = this.fb.group({
      company: new FormControl(this.offer.company.name),
      jobName: new FormControl(this.offer.job.name),
      jobDescription: new FormControl(this.offer.job.description),
      province: new FormControl(this.offer.province.name),
      municipe: new FormControl(this.offer.municipe.name),
      category: new FormControl(this.offer.category.name)
    });
    this.offerForm.disable();
  }

  isMyJobOffer() {
    return this.router.url.indexOf('/my-offers') !== -1 ? true : false;
  }

  /* Registra si se ha borrado o se ha inscrito un usuario a una oferta */
  register() {
    let offers = [...this.user.offers];
    if (this.isMyJobOffer()) {
      offers = offers.filter(offer => offer.id !== this.offer.id);
    } else {
      offers.push(this.offer);
    }
    const user = {...this.user, offers};
    this.updateUser.emit(user);
  }

  back() {
    this.location.back();
  }

}