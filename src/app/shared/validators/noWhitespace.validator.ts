import { AbstractControl } from '@angular/forms';

export function NoWhitespaceValidator(control: AbstractControl) {
    return !((control.value || '').trim().length === 0) ? null : { 'whitespace': true };
}