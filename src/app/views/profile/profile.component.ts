import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserLoggedIn();
  }

  goToPersonalInformationForm() {
    this.route.navigate(['./personal-information'], { relativeTo: this.activatedRoute });
  }

  removeStudie(uid: number) {
    this.user.studies = this.user.studies.filter(studie => studie.id !== uid);
    this.userService.updateUser(this.user).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  goToProfileStudy(uid: number) {
    this.route.navigate(['./profile-study', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  removeLanguage(id: number) {
    this.user.languages = this.user.languages.filter(language => language.id !== id);
    this.userService.updateUser(this.user).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  goToProfileLanguage(uid: number) {
    this.route.navigate(['./profile-language', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  removeExperience(id: number) {
    this.user.experiencies = this.user.experiencies.filter(experience => experience.id !== id);
    this.userService.updateUser(this.user).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  goToExperience(uid: number) {
    this.route.navigate(['./profile-experience', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

}
