/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[appAlphaNumSpecial]'
})
export class AlphaNumSpecialDirective {


    constructor(private el: NgControl) {
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        // NOTE: use NgControl patchValue to prevent the issue on validation
        this.el.control.patchValue(value.replace(/[^0-9A-Za-z-/]/g, ''));
    }


}
