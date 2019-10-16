import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffersDetailComponent } from './offers-detail/offers-detail.component';

@NgModule({
  declarations: [OffersComponent, OffersDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
