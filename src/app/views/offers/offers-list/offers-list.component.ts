import { Component, OnInit, Input } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { Province } from 'src/app/shared/models/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {

  @Input() offers: Offer[] = [];
  @Input() hasStudentRol: boolean;
  
  provinces: Province[] = [];
  searchOffersForm: FormGroup;
  dataSource: any;
  displayedColumnsOffers: string[] = ['job', 'company', 'category', 'date', 'province', 'options'];

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

  // TODO
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}