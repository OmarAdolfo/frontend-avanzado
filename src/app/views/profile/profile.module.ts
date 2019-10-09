import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { DataProfileComponent } from './data-profile/data-profile.component';

@NgModule({
  declarations: [
    PersonalInformationComponent,
    DataProfileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
