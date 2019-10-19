import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileLanguageComponent } from './profile-student/profile-language/profile-language.component';
import { ProfileExperienceComponent } from './profile-student/profile-experience/profile-experience.component';
import { ProfileStudentPersonalInformationDetailComponent } from './profile-student/profile-student-personal-information/profile-student-personal-information-detail.component';
import { ProfileStudyComponent } from './profile-student/profile-study/profile-study.component';
import { ProfileCompanyPersonalInformationComponent } from './profile-company/profile-company-personal-information/profile-company-personal-information.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'personal-information-student',
    component: ProfileStudentPersonalInformationDetailComponent
  },
  {
    path: 'personal-information-company',
    component: ProfileCompanyPersonalInformationComponent
  },
  {
    path: 'profile-study/:id',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-language/:id',
    component: ProfileLanguageComponent
  },
  {
    path: 'profile-experience/:id',
    component: ProfileExperienceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
