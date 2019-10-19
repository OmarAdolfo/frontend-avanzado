import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileLanguageComponent } from './profile-student/profile-language/profile-language.component';
import { ProfileExperienceComponent } from './profile-student/profile-experience/profile-experience.component';
import { ProfileStudentPersonalInformationDetailComponent } from './profile-student/profile-student-personal-information/profile-student-personal-information-detail.component';
import { ProfileStudyCollegeComponent } from './profile-student/profile-study/profile-study-college/profile-study-college.component';
import { ProfileStudyVocationalComponent } from './profile-student/profile-study/profile-study-vocational/profile-study-vocational.component';
import { ProfileStudyComponent } from './profile-student/profile-study/profile-study.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileCompanyPersonalInformationComponent } from './profile-company/profile-company-personal-information/profile-company-personal-information.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileStudyComponent,
    ProfileStudyCollegeComponent,
    ProfileStudyVocationalComponent,
    ProfileLanguageComponent,
    ProfileExperienceComponent,
    ProfileStudentComponent,
    ProfileStudentPersonalInformationDetailComponent,
    ProfileCompanyComponent,
    ProfileCompanyPersonalInformationComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
