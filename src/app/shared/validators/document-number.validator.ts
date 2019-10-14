import { FormGroup } from '@angular/forms';

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

export function DocumentNumberValidator(control: FormGroup) {
    const document = control.get('documentNumber').value;
    const documentType = control.get('documentType').value;
    let valid = true;
    if (documentType && documentType.uid !== -1) {
        valid = validateDocumentNumber(document, documentType.name);
    }
    return valid ? null : { 'numeroDocumentoNoValido': { document } };
}