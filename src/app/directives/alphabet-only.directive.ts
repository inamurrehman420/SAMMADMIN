/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
    selector: '[appAlphabetOnly]'
})

export class AlphabetOnlyDirective {
    key;

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        this.key = event.keyCode;
        if ((this.key >= 15 && this.key <= 64 && this.key != 32) || (this.key >= 123) || (this.key >= 96 && this.key <= 105) || this.key == 110) {
            event.preventDefault();
        }
    }
}
