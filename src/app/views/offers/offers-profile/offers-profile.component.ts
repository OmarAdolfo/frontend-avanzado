import { Component, OnInit, Input } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { Province } from 'src/app/shared/models/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-offers-profile',
  templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnInit {

  @Input() offers: Offer[] = [];
  @Input() hasStudentRol: boolean;

  provinces: Province[] = [];
  searchOffersForm: FormGroup;
  displayedColumnsOffers: string[] = ['job', 'company', 'category', 'date', 'province', 'state', 'options'];
  dataSource: any;

  constructor(
    private router: Router,
    private provinceService: ProvinceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.offers);
    this.getProvinces();
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

  /* Navega a la pantalla de detalle de la oferta */
  goToDetail(id: number) {
    this.router.navigate(['./offer-detail/', id], { relativeTo: this.activatedRoute });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}