import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { CollegeStudy } from 'src/app/shared/models/study.model';
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

  buildForm() {
    this.profileStudyCollegeForm = this.fb.group({
      institution: new FormControl(this.model.institution),
      titleName: new FormControl(this.model.title.name),
      titleDate: new FormControl(this.model.date, DateValidator),
      bilingue: new FormControl(this.model.bilingue),
      certificate: new FormControl(this.model.certificate)
    });
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  handleFileInput(eve: any) {
    if (eve) {
      this.profileStudyCollegeForm.get('certificate').setValue(true);
    } else {
      this.profileStudyCollegeForm.get('certificate').setValue(false);
    }
  }

  save() {
    this.model.bilingue = this.profileStudyCollegeForm.get('bilingue').value;
    this.model.certificate = this.profileStudyCollegeForm.get('certificate').value;
    this.model.date = this.profileStudyCollegeForm.get('titleDate').value;
    this.model.institution = this.profileStudyCollegeForm.get('institution').value;
    this.model.title.name = this.profileStudyCollegeForm.get('titleName').value;
    this.saveProfileStudy.emit(this.model);
  }

  back() {
    this.location.back();
  }

}
