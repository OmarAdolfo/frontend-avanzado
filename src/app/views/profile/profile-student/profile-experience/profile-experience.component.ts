import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/shared/models/experience.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/shared/services/experience.service';
import { ActivatedRoute } from '@angular/router';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { UserService } from 'src/app/shared/services/user.service';
import { User, Student } from 'src/app/shared/models/user.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {

  model: Experience;
  experienceForm: FormGroup;
  withOutBlankSpacesInitiallyRegExp = /^\S.*/;

  constructor(
    private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== 'new') {
      this.experienceService.getExperience(id).subscribe(
        experience => {
          this.model = experience;
          this.buildForm();
        }
      )
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
        const user = (this.authService.getUserLoggedIn() as Student);
        let index = user.experiencies.findIndex(({ id }) => id === experience.id);
        if (index === -1) {
          user.experiencies.push(experience);
        } else {
          user.experiencies[index] = experience;
        }
        this.updateUser(user);
      }
    )
  }

  /* Actualiza el usuario */
  updateUser(user: User) {
    this.userService.saveUser(user).subscribe(
      () => {
        this.back();
      }
    )
  }

  /* Navega a la pantalla anterior */
  back() {
    this.location.back();
  }

}
