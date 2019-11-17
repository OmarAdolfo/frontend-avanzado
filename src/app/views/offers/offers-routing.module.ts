import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersDetailSmartComponent } from './offers-detail/smart/offers-detail-smart.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent
  },
  {
    path: 'my-offers',
    component: OffersComponent
  },
  {
    path: 'offer-detail/:id',
    component: OffersDetailSmartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
