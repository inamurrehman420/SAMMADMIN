/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Directive, HostListener, ElementRef} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[appCapsOnly]'
})
export class CapsOnlyDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        if (this.el.nativeElement.value) {
            const arr: string[] = this.el.nativeElement.value.split('');
            arr[0] = arr[0].toUpperCase();
            this.el.nativeElement.value = arr.join('');
        }
    }


    ////private regex: RegExp = new RegExp(/^[a-zA-Z]([a-zA-Z0-9]+ ?)*$/);
    //private regex: RegExp = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9]+?)*$/);
    //private specialKeys: Array<string> = ['Backspace', 'Space', 'Tab', 'End', 'Home'];

    //constructor(private el: ElementRef) { }

    //@HostListener('keydown', ['$event'])
    //onKeyDown(event: KeyboardEvent) {

    //  if (this.specialKeys.indexOf(event.key) !== -1) {
    //    return;
    //  }
    //  let current: string = this.el.nativeElement.value;
    //
    //  var final = current.charAt(0).toUpperCase() + current.substring(1);

    //  this.event.control.patchValue(final);

    //let next: string = current.concat(event.key);
    //if (next && !String(next).match(this.regex)) {
    //  event.preventDefault();
    //}
    //}
}
