import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student, createNewUser } from 'src/app/shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent implements OnInit {

  @Input() user: Student;
  @Output() updateUser = new EventEmitter();

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {}

  /* Navega a la pantalla de datos personales del estudiante */
  goToPersonalInformationForm() {
    this.route.navigate(['./personal-information-student'], { relativeTo: this.activatedRoute });
  }

  /* Elimina un estudio del estudiante */
  removeStudie(uid: number) {
    let user = createNewUser();
    let studies = [...this.user.studies];
    studies = studies.filter(study => study.id !== uid);
    user = {...this.user, studies};
    this.updateUser.emit(user);
  }

  /* Navega a la pantalla de estudios del estudiante */
  goToProfileStudy(uid: number) {
    this.route.navigate(['./profile-study', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  /* Elimina un idioma del estudiante */
  removeLanguage(id: number) {
    let user = createNewUser();
    let languages = [...this.user.languages];
    languages = languages.filter(language => language.id !== id);
    user = {...this.user, languages};
    this.updateUser.emit(user);
  }

  /* Navega a la pantalla de idiomas del estudiante */
  goToProfileLanguage(uid: number) {
    this.route.navigate(['./profile-language', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

  /* Elimina una experiencia del estudiante */
  removeExperience(id: number) {
    let user = createNewUser();
    let experiencies = [...this.user.experiencies];
    experiencies = experiencies.filter(experience => experience.id !== id);
    user = {...this.user, experiencies};
    this.updateUser.emit(user);
  }

  /* Navega a la pantalla de experiencia del estudiante */
  goToExperience(uid: number) {
    this.route.navigate(['./profile-experience', uid ? uid : 'new'], { relativeTo: this.activatedRoute });
  }

}
