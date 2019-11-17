import { Component, OnInit, Input } from '@angular/core';
import { OfferService } from 'src/app/shared/services/offer.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { Province } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-offers-profile',
  templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnInit {

  @Input() offers: Offer[] = [];
  @Input() hasStudentRol: boolean;
  
  provinces: Province[] = [];
  searchOffersForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    /* Opción para la opción de mis ofertas 
    if (this.isMyJobOffer()) {
      this.offers = (this.authService.getUserLoggedIn() as Student).offers;
    } else {
      Se diferencia si el usuario es estudiante o una empresa
      if (this.authService.hasCompanyRol()) {
        this.offers = (this.authService.getUserLoggedIn() as Enterprise).offers;
      } else {
        this.offerService.getOffers((this.authService.getUserLoggedIn() as Student).studies.map(study => study.title))
          .subscribe(
            offers => {
              this.offers = offers;
            }
          );
      }
      
    }*/
    this.getProvinces();
    this.buildForm();
  }

  /* Comprueba si la ruta es mis ofertas */
  isMyJobOffer() {
    return this.router.url === '/my-offers';
  }

  /* Obtiene las provincias */
  getProvinces() {
    this.provinceService.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
      }
    )
  }

  /* Construye el formulario de búsqueda */
  buildForm() {
    this.searchOffersForm = this.fb.group({
      date: new FormControl('', DateValidator),
      province: new FormControl('')
    });
  }

  /* Navega a la pantalla de detalle de la oferta */
  goToDetail(id: number) {
    this.router.navigate(['./offer-detail/', id], { relativeTo: this.activatedRoute });
  }

}