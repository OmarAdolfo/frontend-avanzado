import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { User, createNewUser, Province, Municipe } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

import * as moment from 'moment';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { MunicipeService } from 'src/app/shared/services/municipe.service';

export const documentNumberType = {
    nifNie: 'NIF/NIE',
    pasaporte: 'Pasaporte',
    otro: 'Otro'
};

const cifLetters = 'JABCDEFGHI';
const cifRegex1 = new RegExp(`^[ABEH][0-9]{8}$`, 'i');
const cifRegex2 = new RegExp(`^[KPQS][0-9]{7}[${cifLetters}]$`, 'i');
const cifRegex3 = new RegExp(`^[CDFGJLMNRUVW][0-9]{7}[0-9${cifLetters}]$`, 'i');

function calculateCifControlDigit(cif: string) {
    let oddSum = 0, evenSum = 0;

    for (let i = 1; i < 8; i++) {
        if (i % 2 === 0) {
            // sum digits in even positions
            evenSum += parseInt(cif[i], 10);
        } else {
            // for each digit in odd position multiply by 2
            let aux = parseInt(cif[i], 10) * 2;
            // sum its digits
            if (aux > 9) {
                aux = 1 + aux - 10;
            }
            // and sum all of them
            oddSum += aux;
        }
    }

    const sum = oddSum + evenSum + '';
    return (10 - parseInt(sum[sum.length - 1], 10)) % 10;
}

function validateCifControlDigit(actual: string, expected: number) {
    if (actual >= '0' && actual <= '9') {
        return parseInt(actual, 10) === expected;
    }
    return actual.toUpperCase() === cifLetters[expected];
}

function validateCif(cif: string): boolean {
    if (cifRegex1.test(cif) || cifRegex2.test(cif) || cifRegex3.test(cif)) {
        const control = cif[cif.length - 1];
        return validateCifControlDigit(control, calculateCifControlDigit(cif));
    }
    return false;
}

function validatePasaporte(value) {
    var pasaporteRexp = /^[a-z]{3}[0-9]{6}[a-z]?$/i;
    return value && pasaporteRexp.test(value);
}

function validate(value) {
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}

function validateNifNie(document: string): boolean {
    return document && validate(document);
}

function validateDocumentNumber(document: string, documentType: string): boolean {
    if (documentType === documentNumberType.nifNie) {
        return validateNifNie(document);
    } else if (documentType === documentNumberType.pasaporte) {
        return validatePasaporte(document);
    } else if (documentType === documentNumberType.otro) {
        return validateCif(document);
    } else {
        return false;
    }
}

function documentNumberValidator(control: FormGroup) {
    const document = control.get('documentNumber').value;
    const documentType = control.get('documentType').value;
    let valid = true;
    if (documentType && documentType.uid !== -1) {
        valid = validateDocumentNumber(document, documentType.name);
    }
    return valid ? null : { 'numeroDocumentoNoValido': { document } };
}

function dateValidator(control: AbstractControl) {
    let valid = true;
    if (control.value) {
        valid = moment(control.value, 'DD/MM/YYYY', true).isValid();
    }
    return valid ? null : { 'dataNotValid': { document } };
}

@Component({
    templateUrl: './personal-information.component.html'
})
export class PersonalInformationComponent implements OnInit {

    model: User;
    personalInformationForm: FormGroup;
    nameAndSurnameRegExp = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)([\s][A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)*$/;
    documentTypes = [
        { uid: 1, name: 'NIF/NIE' },
        { uid: 2, name: 'Pasaporte' },
        { uid: 3, name: 'Otro' }
    ];
    provinces: Province[];
    municipies: Municipe[];

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private provinceService: ProvinceService,
        private municipeService: MunicipeService
    ) { }

    ngOnInit() {
        this.model = this.userService.getUserLoggedIn();
        if (!this.model) {
            this.model = createNewUser();
        }
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

    private buildForm() {
        this.personalInformationForm = this.fb.group({
            name: new FormControl(this.model.name, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(55),
                Validators.pattern(this.nameAndSurnameRegExp)
            ]),
            surname: new FormControl(this.model.surname, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(55),
                Validators.pattern(this.nameAndSurnameRegExp)
            ]),
            birthdate: new FormControl(this.model.birthdate, dateValidator),
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
        }, { validators: documentNumberValidator });

    }

    compare(val1: any, val2: any) {
        return val1.uid === val2.uid;
    }

    login() {
        this.model.name = this.personalInformationForm.get('name').value;
        this.model.surname = this.personalInformationForm.get('surname').value;
        this.model.birthdate = this.personalInformationForm.get('birthdate').value;
        this.model.phone = this.personalInformationForm.get('phone').value;
        this.model.phone2 = this.personalInformationForm.get('phone2').value;
        this.model.documentType = this.personalInformationForm.get('documentType').value;
        this.model.documentNumber = this.personalInformationForm.get('documentNumber').value;
        this.model.address.street = this.personalInformationForm.get('direccion').value;
        this.model.address.province = this.personalInformationForm.get('province').value;
        this.model.address.municipe = this.personalInformationForm.get('municipie').value;
        this.model.license = this.personalInformationForm.get('license').value;
        this.model.aboutMe = this.personalInformationForm.get('aboutMe').value;
        this.model.otherCompetences = this.personalInformationForm.get('otherCompetences').value;
        this.userService.saveUser(this.model).subscribe(
            data => {
                console.log('Subscribe ', data);
            }
        )
    }
}