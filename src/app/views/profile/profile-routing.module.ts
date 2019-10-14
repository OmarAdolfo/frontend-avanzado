import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { DataProfileComponent } from './data-profile/data-profile.component';
import { ProfileStudyComponent } from './profile-study/profile-study.component';
import { ProfileLanguageComponent } from './profile-language/profile-language.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: DataProfileComponent },
      { path: 'personal-information', component: PersonalInformationComponent },
      { path: 'profile-study/:id', component: ProfileStudyComponent },
      { path: 'profile-language/:id', component: ProfileLanguageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
