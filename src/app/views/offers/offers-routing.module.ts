import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent
  },
  /*{
    path: 'profile-student/account',
    component: ProfileAccountComponent
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
