import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Province, Municipe, Student } from 'src/app/shared/models/user.model';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { MunicipeService } from 'src/app/shared/services/municipe.service';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { DocumentNumberValidator } from 'src/app/shared/validators/document-number.validator';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/state/store.interface';
import { Observable } from 'rxjs';
import { user } from 'src/app/shared/state/user/selectors/user.selectors';
import { UpdateUser } from 'src/app/shared/state/user/actions/user.action';

@Component({
  selector: 'app-profile-student-personal-information-detail',
  templateUrl: './profile-student-personal-information-detail.component.html',
  styleUrls: ['./profile-student-personal-information-detail.component.scss']
})
export class ProfileStudentPersonalInformationDetailComponent implements OnInit {

  model: Student;
  user$: Observable<any>;
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
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.getUser();
    this.getProvinces();
    this.getMunicipies();
    this.buildForm();
  }

  /* Obtener usuario */
  getUser() {
    this.user$ = this.store.select(user);
    this.user$.subscribe(
      user => {
        this.model = { ...user, address: { ...user.address } };
      }
    )
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
    this.model.name = this.personalInformationForm.get('name').value;
    this.model.surname = this.personalInformationForm.get('surname').value;
    this.model.birthdate = this.personalInformationForm.get('birthdate').value;
    this.model.phone = this.personalInformationForm.get('phone').value;
    this.model.phone2 = this.personalInformationForm.get('phone2').value;
    this.model.documentType = this.personalInformationForm.get('documentType').value;
    this.model.documentNumber = this.personalInformationForm.get('documentNumber').value;
    this.model.license = this.personalInformationForm.get('license').value;
    this.model.aboutMe = this.personalInformationForm.get('aboutMe').value;
    this.model.otherCompetences = this.personalInformationForm.get('otherCompetences').value;
    this.model.address.street = this.personalInformationForm.get('direccion').value;
    this.model.address.province = this.personalInformationForm.get('province').value;
    this.model.address.municipe = this.personalInformationForm.get('municipie').value;
    this.store.dispatch(new UpdateUser(this.model));
  }

}
