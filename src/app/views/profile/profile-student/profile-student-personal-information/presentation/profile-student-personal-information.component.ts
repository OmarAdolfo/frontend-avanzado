import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Province, Municipe, Student, UserAddress } from 'src/app/shared/models/user.model';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { MunicipeService } from 'src/app/shared/services/municipe.service';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { DocumentNumberValidator } from 'src/app/shared/validators/document-number.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-student-personal-information',
  templateUrl: './profile-student-personal-information.component.html',
  styleUrls: ['./profile-student-personal-information.component.scss']
})
export class ProfileStudentPersonalInformationComponent implements OnInit {

  @Input() model: Student;

  @Output() updateUser = new EventEmitter();

  personalInformationForm: FormGroup;
  documentTypes = [
    { uid: 1, name: 'NIF/NIE' },
    { uid: 2, name: 'Pasaporte' },
    { uid: 3, name: 'Otro' }
  ];
  provinces: Province[];
  municipies: Municipe[];

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private municipeService: MunicipeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProvinces();
    this.getMunicipies();
    this.buildForm();
  }

  /* Obtiene las provincias */
  getProvinces() {
    this.provinceService.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
      }
    )
  }

  /* Obtiene los municipios */
  getMunicipies() {
    this.municipeService.getMunicipes().subscribe(
      municipes => {
        this.municipies = municipes;
      }
    )
  }

  /* Construye el formulario de datos personales */
  private buildForm() {
    this.personalInformationForm = this.fb.group({
      name: new FormControl(this.model.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55),
        Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)([\s][A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)*$/)
      ]),
      surname: new FormControl(this.model.surname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55),
        Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)([\s][A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)*$/)
      ]),
      birthdate: new FormControl(this.model.birthdate, DateValidator),
      phone: new FormControl(this.model.phone, []),
      phone2: new FormControl(this.model.phone2, []),
      documentType: new FormControl(this.model.documentType, []),
      documentNumber: new FormControl(this.model.documentNumber, []),
      direccion: new FormControl(this.model.address.street, []),
      province: new FormControl(this.model.address.province, []),
      municipie: new FormControl(this.model.address.municipe, []),
      license: new FormControl(this.model.license, Validators.maxLength(5)),
      aboutMe: new FormControl(this.model.aboutMe, Validators.minLength(10)),
      otherCompetences: new FormControl(this.model.otherCompetences, Validators.minLength(10))
    }, { validators: DocumentNumberValidator });

  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  /* Guarda los datos personales */
  save() {
    const address: UserAddress = {
      ...this.model.address,
      municipe: this.personalInformationForm.get('municipie').value,
      province: this.personalInformationForm.get('province').value,
      street: this.personalInformationForm.get('direccion').value
    };
    const user = { ...this.model, ...this.personalInformationForm.value, address };
    this.updateUser.emit(user);
  }

  back() {
    this.location.back();
  }

}
