import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CollegeStudy, TitleStudy } from 'src/app/shared/models/study.model';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-study-college',
  templateUrl: './profile-study-college.component.html',
  styleUrls: ['./profile-study-college.component.scss']
})
export class ProfileStudyCollegeComponent implements OnInit {

  @Input()
  model: CollegeStudy;

  @Output()
  saveProfileStudy = new EventEmitter();

  profileStudyCollegeForm: FormGroup;

  levelTypes = [
    { uid: 1, name: 'Ciclo Formativo' },
    { uid: 2, name: 'Título universitario' },
    { uid: 3, name: 'Otro título' }
  ];

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    if (!this.model) {
      this.model = {
        id: -1,
        level: { uid: -1, name: '' },
        title: { uid: -1, name: '' },
        certificate: false,
        date: '',
        bilingue: false,
        institution: '',
        name: ''
      };
    }
    this.buildForm();
  }

  /* Construye el formulario de estudios del estudiante relativos a un título universitario */
  buildForm() {
    this.profileStudyCollegeForm = this.fb.group({
      institution: new FormControl(this.model.institution),
      titleName: new FormControl(this.model.title.name),
      date: new FormControl(this.model.date, DateValidator),
      bilingue: new FormControl(this.model.bilingue),
      certificate: new FormControl(this.model.certificate)
    });
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  /* Checkea si se ha subido un fichero */
  handleFileInput(eve: any) {
    if (eve) {
      this.profileStudyCollegeForm.get('certificate').setValue(true);
    } else {
      this.profileStudyCollegeForm.get('certificate').setValue(false);
    }
  }

  /* Guarda la información relativa a un título universitario */
  save() {
    const title: TitleStudy = {...this.model.title};
    title.name = this.profileStudyCollegeForm.get('titleName').value;
    const collegeStudy: CollegeStudy = {...this.model, ...this.profileStudyCollegeForm.value, title};
    this.saveProfileStudy.emit(collegeStudy);
  }

}
