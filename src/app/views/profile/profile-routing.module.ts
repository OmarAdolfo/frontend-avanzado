import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileLanguageComponent } from './profile-student/profile-language/profile-language.component';
import { ProfileStudentPersonalInformationSmartComponent } from './profile-student/profile-student-personal-information/smart/profile-student-personal-information-smart.component';
import { ProfileCompanyPersonalInformationSmartComponent } from './profile-company/profile-company-personal-information/smart/profile-company-personal-information-smart.component';
import { ProfileExperienceSmartComponent } from './profile-student/profile-experience/smart/profile-experience-smart.component';
import { ProfileStudySmartComponent } from './profile-student/profile-study/smart/profile-study-smart.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'personal-information-student',
    component: ProfileStudentPersonalInformationSmartComponent
  },
  {
    path: 'personal-information-company',
    component: ProfileCompanyPersonalInformationSmartComponent
  },
  {
    path: 'profile-study/:id',
    component: ProfileStudySmartComponent
  },
  {
    path: 'profile-language/:id',
    component: ProfileLanguageComponent
  },
  {
    path: 'profile-experience/:id',
    component: ProfileExperienceSmartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
