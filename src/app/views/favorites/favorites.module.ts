import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './presentation/favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesSmartComponent } from './smart/favorites-smart.component';

@NgModule({
  declarations: [FavoritesComponent, FavoritesSmartComponent],
  imports: [
    CommonModule,
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
