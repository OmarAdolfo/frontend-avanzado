import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Experience } from 'src/app/shared/models/experience.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/shared/services/experience.service';
import { ActivatedRoute } from '@angular/router';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { Student } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileExperienceComponent implements OnInit {

  @Input() user: Student;

  @Output() updateUser = new EventEmitter();

  model: Experience;
  experienceForm: FormGroup;
  withOutBlankSpacesInitiallyRegExp = /^\S.*/;

  constructor(
    private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      this.model = this.user.experiencies.find(experiencie => experiencie.id === id);
    } else {
      this.model = {
        id: -1,
        company: '',
        position: '',
        dateInitial: '',
        dateEnd: '',
        tasks: ''
      };
    }
    this.buildForm();
  }

  /* Construye el formulario de experiencia académica */
  buildForm() {
    this.experienceForm = this.fb.group({
      company: new FormControl(this.model.company, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(this.withOutBlankSpacesInitiallyRegExp)
      ]),
      dateInitial: new FormControl(this.model.dateInitial, DateValidator),
      dateEnd: new FormControl(this.model.dateEnd, DateValidator),
      position: new FormControl(this.model.position, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(this.withOutBlankSpacesInitiallyRegExp)
      ]),
      tasks: new FormControl(this.model.tasks, Validators.minLength(10)),
    });
  }

  /* Guarda la información del formulario */
  save() {
    this.model = Object.assign(this.model, this.experienceForm.value);
    this.experienceService.saveExperience(this.model).subscribe(
      experience => {
        let experiencies = [...this.user.experiencies];
        let index = experiencies.findIndex(({ id }) => id === experience.id);
        if (index === -1) {
          experiencies.push(experience);
        } else {
          experiencies[index] = experience;
        }
        const user: Student = {...this.user, experiencies};
        this.updateUser.emit(user);
      }
    )
  }

}
