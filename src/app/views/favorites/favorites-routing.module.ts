import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesSmartComponent } from './smart/favorites-smart.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesSmartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
