import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { DataProfileComponent } from './data-profile/data-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: DataProfileComponent },
      { path: 'personal-information', component: PersonalInformationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
