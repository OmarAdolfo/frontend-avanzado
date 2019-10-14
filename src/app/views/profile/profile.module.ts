import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { ProfileStudyComponent } from './profile-study/profile-study.component';
import { ProfileStudyCollegeComponent } from './profile-study/profile-study-college/profile-study-college.component';
import { ProfileStudyVocationalComponent } from './profile-study/profile-study-vocational/profile-study-vocational.component';

@NgModule({
  declarations: [
    PersonalInformationComponent,
    DataProfileComponent,
    ProfileComponent,
    ProfileStudyComponent,
    ProfileStudyCollegeComponent,
    ProfileStudyVocationalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
