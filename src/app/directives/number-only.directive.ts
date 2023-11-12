/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
    constructor(private el: NgControl) {
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        // NOTE: use NgControl patchValue to prevent the issue on validation
        this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
        //this.el.control.patchValue(value.replace(/[^0-9A-Za-z-/]/g, ''));
    }
}
