import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { StudyService } from 'src/app/shared/services/study.service';

@Component({
  selector: 'app-profile',
  templateUrl: './data-profile.component.html'
})
export class DataProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private studyService: StudyService
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

}
