import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @Output() updateUser = new EventEmitter();
  
  profileStudyForm: FormGroup;
  model: CollegeStudy | VocationalStudy;
  levelTypes = [
    { uid: 1, name: 'Ciclo Formativo' },
    { uid: 2, name: 'Título universitario' },
    { uid: 3, name: 'Otro título' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private studyService: StudyService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      this.model = this.user.studies.find(studie => studie.id == id);
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
