import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileLanguageComponent } from './profile-student/profile-language/profile-language.component';
import { ProfileExperienceComponent } from './profile-student/profile-experience/presentation/profile-experience.component';
import { ProfileStudentPersonalInformationComponent } from './profile-student/profile-student-personal-information/presentation/profile-student-personal-information.component';
import { ProfileStudyComponent } from './profile-student/profile-study/presentation/profile-study.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileCompanyPersonalInformationComponent } from './profile-company/profile-company-personal-information/presentation/profile-company-personal-information.component';
import { ProfileStudentPersonalInformationSmartComponent } from './profile-student/profile-student-personal-information/smart/profile-student-personal-information-smart.component';
import { ProfileCompanyPersonalInformationSmartComponent } from './profile-company/profile-company-personal-information/smart/profile-company-personal-information-smart.component';
import { ProfileExperienceSmartComponent } from './profile-student/profile-experience/smart/profile-experience-smart.component';
import { ProfileStudyCollegeComponent } from './profile-student/profile-study/presentation/profile-study-college/profile-study-college.component';
import { ProfileStudyVocationalComponent } from './profile-student/profile-study/presentation/profile-study-vocational/profile-study-vocational.component';
import { ProfileStudySmartComponent } from './profile-student/profile-study/smart/profile-study-smart.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileStudyComponent,
    ProfileStudyCollegeComponent,
    ProfileStudyVocationalComponent,
    ProfileLanguageComponent,
    ProfileExperienceComponent,
    ProfileStudentComponent,
    ProfileStudentPersonalInformationSmartComponent,
    ProfileStudentPersonalInformationComponent,
    ProfileCompanyComponent,
    ProfileCompanyPersonalInformationComponent,
    ProfileCompanyPersonalInformationSmartComponent,
    ProfileExperienceSmartComponent,
    ProfileStudySmartComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
