import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { OffersDetailComponent } from './offers-detail/presentation/offers-detail.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersProfileComponent } from './offers-profile/offers-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffersDetailSmartComponent } from './offers-detail/smart/offers-detail-smart.component';

@NgModule({
  declarations: [
    OffersComponent,
    OffersProfileComponent,
    OffersListComponent,
    OffersDetailComponent,
    OffersDetailSmartComponent
  ],
  imports: [CommonModule, OffersRoutingModule, SharedModule]
})
export class OffersModule {}
