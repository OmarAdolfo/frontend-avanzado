import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent implements OnInit {

  @Input() user: Student;

  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  goToPersonalInformationForm() {
    this.route.navigate(['./personal-information-student'], { relativeTo: this.activatedRoute });
  }

  removeStudie(uid: number) {
    this.user.studies = this.user.studies.filter(studie => studie.id !== uid);
    this.updateUser();
  }

  goToProfileStudy(uid: number) {
    this.route.navigate(['./profile-study', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  removeLanguage(id: number) {
    this.user.languages = this.user.languages.filter(language => language.id !== id);
    this.updateUser();
  }

  goToProfileLanguage(uid: number) {
    this.route.navigate(['./profile-language', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  removeExperience(id: number) {
    this.user.experiencies = this.user.experiencies.filter(experience => experience.id !== id);
    this.updateUser();
  }

  goToExperience(uid: number) {
    this.route.navigate(['./profile-experience', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      user => {
        this.authService.setUserLoggedIn(this.user);
        this.user = user as Student;
      }
    )
  }

}
