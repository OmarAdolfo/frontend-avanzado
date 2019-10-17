import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileStudyComponent } from './profile-study/profile-study.component';
import { ProfileStudyCollegeComponent } from './profile-study/profile-study-college/profile-study-college.component';
import { ProfileStudyVocationalComponent } from './profile-study/profile-study-vocational/profile-study-vocational.component';
import { ProfileLanguageComponent } from './profile-language/profile-language.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';

@NgModule({
  declarations: [
    PersonalInformationComponent,
    ProfileComponent,
    ProfileStudyComponent,
    ProfileStudyCollegeComponent,
    ProfileStudyVocationalComponent,
    ProfileLanguageComponent,
    ProfileExperienceComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
