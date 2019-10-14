import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function DateValidator(control: AbstractControl) {
    let valid = true;
    if (control.value) {
        valid = moment(control.value, 'DD/MM/YYYY', true).isValid();
    }
    return valid ? null : { dataNotValid: true };
}