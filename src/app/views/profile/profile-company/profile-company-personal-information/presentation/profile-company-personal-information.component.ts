import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Enterprise, Province, Municipe, UserAddress } from 'src/app/shared/models/user.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/shared/validators/noWhitespace.validator';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { MunicipeService } from 'src/app/shared/services/municipe.service';

@Component({
  selector: 'app-profile-company-personal-information',
  templateUrl: './profile-company-personal-information.component.html',
  styleUrls: ['./profile-company-personal-information.component.scss']
})
export class ProfileCompanyPersonalInformationComponent implements OnInit {

  @Input() model: Enterprise;

  @Output() updateUser = new EventEmitter();

  personalInformationForm: FormGroup;
  provinces: Province[];
  municipies: Municipe[];

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private municipeService: MunicipeService
  ) { }

  ngOnInit() {
    this.getProvinces();
    this.getMunicipies();
    this.buildForm();
  }

  getProvinces() {
    this.provinceService.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
      }
    )
  }

  getMunicipies() {
    this.municipeService.getMunicipes().subscribe(
      municipes => {
        this.municipies = municipes;
      }
    )
  }

  compare(val1: any, val2: any) {
    return val1.uid === val2.uid;
  }

  private buildForm() {
    this.personalInformationForm = this.fb.group({
      comercialName: new FormControl(this.model.comercialName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        NoWhitespaceValidator
      ]),
      businessName: new FormControl(this.model.businessName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        NoWhitespaceValidator
      ]),
      documentNumber: new FormControl(this.model.documentNumber),
      street: new FormControl(this.model.address.street),
      province: new FormControl(this.model.address.province),
      municipie: new FormControl(this.model.address.municipe),
      url: new FormControl(this.model.url, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
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
      phone: new FormControl(this.model.phone),
      email: new FormControl(this.model.email, Validators.email)
    });
  }

  save() {
    const address: UserAddress = {
      ...this.model.address,
      municipe: this.personalInformationForm.get('municipie').value,
      province: this.personalInformationForm.get('province').value,
      street: this.personalInformationForm.get('street').value
    };
    const user = { ...this.model, ...this.personalInformationForm.value, address };
    this.updateUser.emit(user);
  }

}
