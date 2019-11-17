import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Experience } from 'src/app/shared/models/experience.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/shared/services/experience.service';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { Student } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {

  @Input() user: Student;
  @Input() experience: Experience;

  @Output() updateUser = new EventEmitter();

  experienceForm: FormGroup;
  withOutBlankSpacesInitiallyRegExp = /^\S.*/;

  constructor(
    private experienceService: ExperienceService,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  /* Construye el formulario de experiencia académica */
  buildForm() {
    this.experienceForm = this.fb.group({
      company: new FormControl(this.experience.company, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(this.withOutBlankSpacesInitiallyRegExp)
      ]),
      dateInitial: new FormControl(this.experience.dateInitial, DateValidator),
      dateEnd: new FormControl(this.experience.dateEnd, DateValidator),
      position: new FormControl(this.experience.position, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(this.withOutBlankSpacesInitiallyRegExp)
      ]),
      tasks: new FormControl(this.experience.tasks, Validators.minLength(10)),
    });
  }

  /* Guarda la información del formulario */
  save() {
    this.experience = Object.assign(this.experience, this.experienceForm.value);
    this.experienceService.saveExperience(this.experienceForm.value).subscribe(
      experience => {
        let experiencies = [...this.user.experiencies];
        let index = experiencies.findIndex(({ id }) => id === experience.id);
        if (index === -1) {
          experiencies.push(experience);
        } else {
          experiencies[index] = experience;
        }
        const user: Student = { ...this.user, experiencies };
        this.updateUser.emit(user);
      }
    )
  }

  back() {
    this.location.back();
  }

}
