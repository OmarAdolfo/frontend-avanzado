import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    templateUrl: './personal-information.component.html'
})
export class PersonalInformationComponent implements OnInit {
    
    model: User;
    personalInformationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.model = this.userService.getUserLoggedIn();
        this.buildForm();
    }

    private buildForm() {
        this.personalInformationForm = this.fb.group({
            nombre: new FormControl(this.model.name, [
                Validators.required, 
                Validators.minLength(3), 
                Validators.maxLength(55), 
                Validators.pattern('^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)[\s]*([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)*$')
            ]),
            apellido: new FormControl(this.model.surname, [
                Validators.required, 
                Validators.minLength(3), 
                Validators.maxLength(55), 
                Validators.pattern('^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)[\s]*([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)*$')
            ])
        });
    }

    goBack() {
        this.location.back();
    }

}