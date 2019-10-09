import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

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
    return pasaporteRexp.test(value);
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
    }
}

function documentNumberValidator(control: FormGroup) {
    const document = control.get('numeroDocumento').value;
    const documentType = control.get('tipoDocumento').value;
    const valid = validateDocumentNumber(document, documentType.name);
    return valid ? null : { 'numeroDocumentoNoValido': { document } };
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

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.model = this.userService.getUserLoggedIn();
        if (this.model) {
            this.buildForm();
        }
    }

    private buildForm() {
        this.personalInformationForm = this.fb.group({
            nombre: new FormControl(this.model.name, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(55),
                Validators.pattern(this.nameAndSurnameRegExp)
            ]),
            apellido: new FormControl(this.model.surname, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(55),
                Validators.pattern(this.nameAndSurnameRegExp)
            ]),
            fechaNacimiento: new FormControl(this.model.birthdate, []),
            telefono: new FormControl(this.model.phone, []),
            telefonoAlternativo: new FormControl(this.model.phone2, []),
            tipoDocumento: new FormControl(this.model.documentType, []),
            numeroDocumento: new FormControl(this.model.documentNumber, [])
        }, { validators: documentNumberValidator });

        this.personalInformationForm.get('fechaNacimiento').valueChanges.subscribe(
            data => {
                console.log(data);
            }
        );

        this.personalInformationForm.get('tipoDocumento').valueChanges.subscribe(
            data => {
                console.log(data);
            }
        );
    }

    compare(val1: any, val2: any) {
        return val1.id === val2.id;
    }

}