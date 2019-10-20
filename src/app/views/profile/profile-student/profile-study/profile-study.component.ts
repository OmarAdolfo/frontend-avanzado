import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CollegeStudy, VocationalStudy } from 'src/app/shared/models/study.model';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';
import { StudyService } from 'src/app/shared/services/study.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Student } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-study',
  templateUrl: './profile-study.component.html',
  styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent implements OnInit {

  profileStudyForm: FormGroup;
  model: CollegeStudy | VocationalStudy;
  levelTypes = [
    { uid: 1, name: 'Ciclo Formativo' },
    { uid: 2, name: 'Título universitario' },
    { uid: 3, name: 'Otro título' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private studyService: StudyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      this.model = (this.authService.getUserLoggedIn() as Student).studies.find(studie => studie.id == id);
    }
    this.buildForm();
  }

  /* Construye el formulario */
  buildForm() {
    this.profileStudyForm = this.fb.group({
      level: new FormControl(this.model && this.model.level ? this.model.level : { uid: -1, name: '' })
    });
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  /* Guarda los estudios de un estudiante */
  save(eve: any) {
    this.model = eve;
    this.model.level = this.profileStudyForm.get('level').value;
    this.studyService.saveStudy(this.model).subscribe(
      study => {
        const user = (this.authService.getUserLoggedIn() as Student);
        let index = user.studies.findIndex(({ id }) => id === study.id);
        if (index === -1) {
          user.studies.push(study);
        } else {
          user.studies[index] = study;
        }
        this.userService.saveUser(user).subscribe(
          () => {
            this.back();
          }
        )
      }
    )
  }

  back() {
    this.location.back();
  }

}
