import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CollegeStudy, VocationalStudy } from 'src/app/shared/models/study.model';
import { StudyService } from 'src/app/shared/services/study.service';
import { Student } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-study',
  templateUrl: './profile-study.component.html',
  styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent implements OnInit {

  @Input() user: Student;
  @Input() study: CollegeStudy | VocationalStudy;

  @Output() updateUser = new EventEmitter();
  
  profileStudyForm: FormGroup;
  levelTypes = [
    { uid: 1, name: 'Ciclo Formativo' },
    { uid: 2, name: 'Título universitario' },
    { uid: 3, name: 'Otro título' }
  ];

  constructor(
    private fb: FormBuilder,
    private studyService: StudyService,
    private location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  /* Construye el formulario */
  buildForm() {
    this.profileStudyForm = this.fb.group({
      level: new FormControl(this.study && this.study.level ? this.study.level : { uid: -1, name: '' })
    });
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  /* Guarda los estudios de un estudiante */
  save(eve: any) {
    const study = eve;
    study.level = this.profileStudyForm.get('level').value;
    this.studyService.saveStudy(study).subscribe(
      study => {
        let studies = [...this.user.studies];
        let index = studies.findIndex(({ id }) => id === study.id);
        if (index === -1) {
          studies.push(study);
        } else {
          studies[index] = study;
        }
        const user = {...this.user, studies};
        this.updateUser.emit(user);
      }
    )
  }

  back() {
    this.location.back();
  }

}
