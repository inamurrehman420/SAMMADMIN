import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'button[appPasswordToggle]',
  exportAs: 'appPasswordToggle'
})
export class PasswordToggleDirective {

  public get type(): string {
    return this.show ? 'text' : 'password';
  }

  public get icon(): string {
    return this.show ? 'visibility_off' : 'visibility';
  }

  private show: boolean = false;

  @HostListener('click')
  public onClick(): void {
    this.show = !this.show;
  }

}