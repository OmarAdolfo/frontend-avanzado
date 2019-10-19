import { AbstractControl } from '@angular/forms';

export function NoWhitespaceStartAndEndValidator(control: AbstractControl) {
    return !((control.value || '').trim().length === 0) ? null : { 'whitespace': true };
}

export function NoWhitespaceValidator(control: AbstractControl) {
    return !((control.value || '').indexOf(" ") !== -1) ? null : { 'whitespace': true };
}